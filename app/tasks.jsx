import { useState } from "react";
import { Appearance, FlatList, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from '@/constants/Colors';
import MENU_IMAGES from '@/constants/MenuImages';
import { MENU_ITEMS } from '@/constants/MenuItems';

export default function MenuScreen() {
    const colorScheme = Appearance.getColorScheme()

    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const styles = createStyles(theme, colorScheme)

    const [completedItems, setCompletedItems] = useState([]);

    const toggleCompleted = (id) => {
        setCompletedItems((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    };

    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

    const separatorComp = <View style={styles.separator} />

    //const headerComp = <Text>Top of List</Text>
    const footerComp = <Text style={{ color: theme.text }}>End of List</Text>

    return (
        <Container>

            <FlatList
                data={MENU_ITEMS}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={separatorComp}
                //ListHeaderComponent={headerComp}
                ListFooterComponent={footerComp}
                ListFooterComponentStyle={styles.footerComp}
                ListEmptyComponent={<Text>No items</Text>}
                renderItem={({ item }) => {
                    const isCompleted = completedItems.includes(item.id);

                    return (
                        <View
                            style={[
                                styles.row,
                                { backgroundColor: isCompleted ? "green" : "#2f2f2f" } // grey when not completed
                            ]}
                        >
                            <View style={styles.menuTextRow}>
                                <Text style={[styles.menuItemTitle, styles.menuItemText]}>
                                    {item.title}
                                </Text>
                                <Text style={styles.menuItemText}>
                                    {item.description}
                                </Text>

                                <TouchableOpacity
                                    style={styles.completeButton}
                                    onPress={() => toggleCompleted(item.id)}
                                >
                                    <Text style={styles.buttonText}>
                                        {isCompleted ? "Undo" : "Completed"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Image
                                source={MENU_IMAGES[item.id - 1]}
                                style={styles.menuImage}
                            />
                        </View>
                    );
                }}

            />

        </Container>
    )
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        contentContainer: {
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 12,
            backgroundColor: theme.background,
        },
        separator: {
            height: 1,
            backgroundColor: colorScheme === 'dark' ? 'papayawhip' : "#000",
            width: '50%',
            maxWidth: 300,
            marginHorizontal: 'auto',
            marginBottom: 10,
        },
        footerComp: {
            marginHorizontal: 'auto',
        },
        completeButton: {
            marginTop: 8,
            backgroundColor: "#444",
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
            alignSelf: "flex-start",
        },
        buttonText: {
            color: "#fff",
            fontWeight: "600",
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            maxWidth: 600,
            height: 100,
            marginBottom: 10,
            borderStyle: 'solid',
            borderColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
            borderWidth: 1,
            borderRadius: 20,
            overflow: 'hidden',
            marginHorizontal: 'auto',
        },
        menuTextRow: {
            width: '65%',
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 5,
            flexGrow: 1,
        },
        menuItemTitle: {
            fontSize: 18,
            textDecorationLine: 'underline',
        },
        menuItemText: {
            color: theme.text,
        },
        menuImage: {
            width: 100,
            height: 100,
        }
    })
}