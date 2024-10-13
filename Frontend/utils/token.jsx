import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default async function token() {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
}


