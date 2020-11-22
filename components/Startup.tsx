import React from "react";
import { View, StyleSheet } from "react-native";
import IntlProvider from "react-intl/src/components/provider";
import { useStoreActions, useStoreState } from "../store";
import messages_tr from "../i18n/tr-TR.json";
import messages_en from "../i18n/en-US.json";

const messages: Record<string, any> = {
    tr: messages_tr,
    en: messages_en
};

// @ts-ignore
if (!global.Intl) {
    // @ts-ignore
    global.Intl = require("intl");
    require("intl/locale-data/jsonp/en");
    require("intl/locale-data/jsonp/tr");
}

  
export function Startup(props: { children: any; }) {
    const currentLocale = useStoreState(state => state.locale.currentLocale);
    const { children } = props;
    return (
        <View style={styles.container}>
            <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
                {children}
            </IntlProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131c47"
    }
});