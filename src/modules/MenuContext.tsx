import { TextE } from "@components/TextE";
import { ViewE } from "@components/ViewE";
import React, { createContext, useState, PropsWithChildren, useMemo, FC, useCallback } from "react";
import { Menu, Modal, Portal } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useStyleConstants } from "@hooks/useStyleConstants";
import { DividerE } from "@components/DividerE";

// name: Menu
export type MenuContextValue = {
  show: (options: ShowMenuOptions) => void;
  hide: () => void;
};

export type MenuItem = {
  text: string;
  icon?: string;
  onPress: AsyncCallback<void | boolean>;
}
type MenuConfig = (MenuItem | "divider")[];
export type ShowMenuOptions = {
  title?: string;
  menu: MenuConfig;
}

export const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ShowMenuOptions>();
  const styles = useStyles();

  const show = useCallback((options: ShowMenuOptions) => {
    setVisible(true);
    setOptions(options);
  }, []);
  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const value = useMemo(() => {
    return {
      show,
      hide,
    };
  }, [show, hide]);

  const calculatedMenu = useMemo<MenuConfig>(() => {
    return [...options?.menu || [],
      "divider",
    {
      onPress: () => { },
      text: "Close",
      icon: "close",
    }];
  }, [options?.menu]);

  const handleOnPress = useCallback(async (fn: AsyncCallback<void | boolean>) => {
    const result = await fn();
    if (!result) {
      hide();
    }
  }, [hide]);

  return <MenuContext.Provider value={value}>
    {children}
    <Portal>
      <Modal visible={visible} onDismiss={hide} contentContainerStyle={styles.container}>
        <ViewE>
          <ViewE padding>
            <TextE type='menuHeader'>{options?.title}</TextE>
          </ViewE>
          <DividerE />
          <ViewE>
            {calculatedMenu.map((item, index) => {
              const key = `menu-item-key-${index}`;
              if (item === "divider") {
                return <DividerE key={key} />;
              }
              return <Menu.Item key={key} title={item.text} onPress={() => handleOnPress(item.onPress)} leadingIcon={item.icon} />;
            })}
          </ViewE>
        </ViewE>
      </Modal>
    </Portal>
  </MenuContext.Provider>;
};


const useStyles = () => {
  const styleConstants = useStyleConstants();

  return useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: styleConstants.colors.background,
      width: "75%",
      marginLeft: "12.5%",
    }
  }), [styleConstants.colors.background]);
};