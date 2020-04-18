import React from "react";
import {
  Image,
  Linking,
  ImageBackground,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FormattedText } from "../../components/formatted-text";
import colors from "../../colors";
import icons, { Icon } from "../../components/icon";
import { getVersion } from "../../utils/codepush";
import frameImg from "../../assets/images/frame.png";

const GET_INFO = gql`
  query GetInfo {
    info {
      version
    }
  }
`;

const Contact = () => {
  const { data } = useQuery(GET_INFO);
  const info = data ? data.info : {};
  const [codepushVersion, setCodepushVersion] = React.useState({
    label: "na",
    version: "na",
  });

  React.useEffect(() => {
    async function helper() {
      setCodepushVersion(await getVersion());
    }
    helper();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <View style={styles.logoContainer}>
        <Icon name="info" size="large" />
      </View>
      <ImageBackground
        source={frameImg}
        style={styles.frame}
        resizeMode="stretch"
      >
        <FormattedText style={styles.text} id="contact.title" />
        <TouchableOpacity onPress={() => Linking.openURL("tel:+982155409495")}>
          <View style={styles.row}>
            <FormattedText style={styles.text} id="contact.tel" />
            <FormattedText style={styles.text} id="contact.telnumber" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => Linking.openURL("http://iacap.ir/")}
        >
          <Text style={styles.text}>iacap.ir</Text>
        </TouchableOpacity>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://twitter.com/iacap_ir")}
          >
            <View style={styles.socialIconContainer}>
              <Image
                source={icons.twitter}
                resizeMode="contain"
                style={styles.socialIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.instagram.com/iacap2")}
          >
            <View style={styles.socialIconContainer}>
              <Image
                source={icons.instagram}
                resizeMode="contain"
                style={styles.socialIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://t.me/IACAP")}
          >
            <View style={styles.socialIconContainer}>
              <Image
                source={icons.telegram}
                resizeMode="contain"
                style={styles.socialIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.versionContainer}>
        <Text style={styles.version}>api version: {info.version || "-"}</Text>
        <Text style={styles.version}>
          push version: {codepushVersion.label}
        </Text>
        <Text style={styles.version}>
          app version: {codepushVersion.version}
        </Text>
      </View>
    </View>
  );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
  },
  frame: {
    backgroundColor: "transparent",
    width: width - 30 * 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  text: {
    fontSize: 18,
    color: colors.secondary,
    lineHeight: 2 * 18,
    textAlign: "center",
  },
  socialContainer: {
    marginBottom: 30,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  socialIconContainer: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  row: {
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  versionContainer: {
    flexDirection: "column",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  version: {
    color: colors.secondary,
    fontSize: 12,
  },
  logoContainer: {
    position: "absolute",
    top: 30,
    left: 30,
  },
});

export default Contact;
