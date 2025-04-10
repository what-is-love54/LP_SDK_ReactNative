package com.awesomeproject

import android.content.Context
import com.liveperson.infra.InitLivePersonProperties
import com.liveperson.infra.callbacks.InitLivePersonCallBack
import com.liveperson.messaging.sdk.api.LivePerson

object LivePersonInitHelper {
    @JvmStatic
    fun initializeSDK(
        context: Context,
        callback: InitLivePersonCallBack,
        initProps: InitLivePersonProperties
    ) {
        LivePerson.initialize(context, callback, initProps)
    }
}