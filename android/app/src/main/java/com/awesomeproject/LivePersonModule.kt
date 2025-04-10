package com.awesomeproject

import android.app.Activity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.liveperson.infra.ConversationViewParams
import com.liveperson.infra.InitLivePersonProperties
import com.liveperson.infra.auth.LPAuthenticationParams
import com.liveperson.infra.auth.LPAuthenticationType
import com.liveperson.infra.callbacks.InitLivePersonCallBack
import com.liveperson.messaging.sdk.api.LivePerson
import java.lang.reflect.Method

class LivePersonModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var globalBrandId: String? = null
    private var globalAuthCode: String? = null

    companion object {
        private const val APP_ID = "com.awesomeproject"
    }

    override fun getName(): String {
        return "LivePersonModule"
    }

    @ReactMethod
    fun initSDK(brandId: String, authCode: String, promise: Promise) {
        val initProps = InitLivePersonProperties(
            brandId,
            APP_ID,
            null
        )

        try {
            val method: Method = LivePerson::class.java.getDeclaredMethod(
                "initialize",
                ReactApplicationContext::class.java,
                InitLivePersonCallBack::class.java,
                InitLivePersonProperties::class.java
            )
            method.isAccessible = true
            method.invoke(
                null,
                reactContext,
                object : InitLivePersonCallBack {
                    override fun onInitSucceed() {
                        val authParams = LPAuthenticationParams(LPAuthenticationType.AUTH).apply {
                            authKey = authCode
                        }
                        val activity: Activity? = currentActivity
                        if (activity != null) {
                            LivePerson.showConversation(activity, authParams, ConversationViewParams())
                            promise.resolve("Conversation shown successfully")
                        } else {
                            promise.reject("NO_ACTIVITY", "Activity is null")
                        }
                    }

                    override fun onInitFailed(e: Exception) {
                        promise.reject("INIT_FAILED", "LivePerson SDK initialization failed: ${e.message}")
                    }
                },
                initProps
            )
        } catch (e: Exception) {
            e.printStackTrace()
            promise.reject("REFLECTION_ERROR", "Reflection error: ${e.message}")
        }
    }

    @ReactMethod
    fun showConversation(accountNumber: String, promise: Promise) {
        val activity: Activity = currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "Activity is null, can't show conversation.")
            return
        }

        try {
            val authParams = LPAuthenticationParams(LPAuthenticationType.UN_AUTH) // Anonymous user
            val conversationViewParams = ConversationViewParams(false)
            LivePerson.showConversation(activity, authParams, conversationViewParams)
            promise.resolve("Conversation shown successfully")
        } catch (e: Exception) {
            promise.reject("SHOW_ERROR", "Error showing conversation: ${e.message}")
        }
    }
}