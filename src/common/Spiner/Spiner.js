import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Spiner = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" width="350" color="#003300" />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 10
    },
});

export default Spiner;