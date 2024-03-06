import {createGlobalStyle} from 'styled-components'
import reset from 'styled-reset';


const GlobalStyle = createGlobalStyle`
${reset}

@font-face {
  font-family: "Roboto", sans-serif;
  src: url('style/fonts/roboto/Roboto-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: "Roboto", sans-serif;
  src: url('style/fonts/roboto/Roboto-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Roboto", sans-serif;
  src: url('style/fonts/roboto/Roboto-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Roboto", sans-serif;
  src: url('style/fonts/roboto/Roboto-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: "Roboto", sans-serif;
  src: url('style/fonts/roboto/Roboto-Black.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

body{
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: normal;
}
`;

export default GlobalStyle;