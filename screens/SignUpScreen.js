import React from "react",
import { View, Text,StyleSheet,ScrollView,TouchableOpacity} from "react-native";
import { Button } from "react-native-elements";
import { SocialIcon } from "react-native-elements";


const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.appName}>Grocery App</Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "#000",
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Sign up
        </Text>

  

          <Text style={styles.inputlabelStyle}>Email</Text>
          <Input
            placeholder="Enter Email..."
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={(text) => setEmail(text.trim())}
          />

          <Text style={styles.inputlabelStyle}>Password</Text>
          <Input
            placeholder="Enter Password..."
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={styles.inputlabelStyle}>Confirm Password</Text>
          <Input
            placeholder="Confirm Password..."
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            secureTextEntry={true}
            onChangeText={(text) => setPassword2(text)}
          />
          <Button
            title="Sign up"
            onPress={onSubmit}
            buttonStyle={styles.signupBtnStyle}
          />
        

        <Text onPress={goToLogin} style={styles.goToSignIn}>
          Have an account? Log in
        </Text>

        <View style={styles.alternativeSignUp}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "rgba(0, 0, 0, 0.45)",
            }}
          >
            Or continue with
          </Text>
          <View style={styles.iconsViewStyle}>
            <Button
              icon={<SocialIcon type="google" />}
              onPress={() => signInWithGoogle()}
              buttonStyle={styles.iconBtnStyle}
            />
            <Button
              icon={<SocialIcon type="facebook" />}
              onPress={() => signInWithFacebook()}
              buttonStyle={styles.iconBtnStyle}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 54,
    color: colors.primary,
    textAlign: "center",
    marginTop: 42,
  },
  inputViewStyle: {
    marginTop: 22,
  },
  inputContainerStyle: {
    borderColor: "transparent",
  },
  inputStyle: {
    height: 46,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 6,
    // width: "100%",
    // height: 52,
  },
  inputlabelStyle: {
    marginLeft: 10,
  },
  signupBtnStyle: {
    width: 300,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  goToSignIn: {
    color: "rgba(0, 0, 0, 0.45)",
    fontSize: 14,
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 16,
  },
  alternativeSignUp: {
    marginTop: 24,
    alignItems: "center",
  },
  iconBtnStyle: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
  },
  iconsViewStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 160,
    height: 40,
    marginTop: 12,
  },
});
