import React from "react";
import { Text } from "react-native";
import { FormattedMessage } from "react-intl";

interface TranslatedTextProps {
    style?: object;
    id: string;
    values?: any;
}
export function TranslatedText(props: TranslatedTextProps) {
    return (
        <Text {...props} style={props.style}>
            <FormattedMessage id={props.id} values={props.values} />
        </Text>
    );
}