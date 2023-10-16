import { Text, TouchableOpacity, View } from "react-native";
import { MenuProps } from "./types";
import { useEffect, useState } from "react";
import useMenuStyles from "./styles";

export default function Menu(props: MenuProps) {
    const styles = useMenuStyles();
    const [selectedMenu, setSelectedMenu] = useState<string>(props.menus[0]);

    useEffect(() => {
        props.onMenuSelection(selectedMenu);
    }, [selectedMenu]);

    return (
        <View style={[styles.container, props.style && props.style]}>
            {props.menus.map((menu, index) => (
                <View key={index} style={styles.menuWrapper}>
                    <TouchableOpacity
                        style={styles.menuTouchBox}
                        activeOpacity={0.6}
                        onPress={() => setSelectedMenu(menu)}
                        disabled={selectedMenu === menu}>
                        <View style={[styles.menu, selectedMenu === menu && styles.selectedMenu]}>
                            <Text style={[styles.menuText, selectedMenu === menu && styles.selectedMenuText]}>
                                {menu}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}
