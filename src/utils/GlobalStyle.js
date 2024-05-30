import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  body,html{

    padding: 0;
    margin: 0;
    overscroll-behavior: none;
      
      
  }
  @font-face {
      font-family:Roboto-Regular;
      src: url(../fonts/Roboto-Regular.ttf)
  }

  dl,dt,ul,li{
    padding: 0;
    margin: 0;
    
  }
  li {
    list-style: none;
  }
  * {
    font-family:Roboto-Regular,-apple-system,BlinkMacSystemFont,
    "Segoe UI",Roboto,"Helvetica Neue",
    Arial,sans-serif,"Apple Color Emoji",
    "Segoe UI Emoji","Segoe UI Symbol" ;
    padding: 0;
    margin: 0;
    &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
    &:focus{
      outline: none;
    }
    &:focus-visible{
      outline: none!important;
    }
  }
  a{
    text-decoration: none;
    color: #000;
  
  }


  * {
    -webkit-tap-highlight-color: transparent;
  }
`;

export default GlobalStyle;
