import { StyleSheet } from 'react-native';





const styles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent : 'center',
    position: "relative",
    paddingBottom : 10,
    backgroundColor: isDarkMode ? "#030712": "#ffffff",
  },
  container2:{
    flex : 1,
    padding : 10,
    margin: 0,
    backgroundColor: isDarkMode ? "#030712": "#ffffff",
    justifyContent :'center',
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection : 'row',
    alignItems: 'center',
    borderColor: isDarkMode ? "#1f2937" : '#e5e7eb',
    justifyContent :'center',
    backgroundColor : isDarkMode? "#0b111d" :'#f2f2f2',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    width : "100%"
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    border: "none",
    color: "black",
    outline:'none',
    borderWidth: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#7c3aed",
    padding: 15, 
    width: '100%',
    borderRadius: 5,
    marginTop : 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  Signupage :{
    justifyContent: 'center',
    alignItems :'center',
    height : "30%"
  },
  light:{
    backgroundColor: 'white',
  },
  dark:{
    backgroundColor: 'black'
  },
  lightDark:{
    flexDirection : 'row',
    justifyContent:'center',
    gap: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRadius : 2,
    padding: 5,
    paddingLeft : 10,
    paddingRight: 10,
    borderColor: isDarkMode ? "#1f2937" : "#e5e7eb"
  }
});

export default styles
