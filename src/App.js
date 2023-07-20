import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import { Container, ThemeProvider, createTheme, Switch } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';
import { light } from '@mui/material/styles/createPalette';

function App() {

  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const dictionaryApi = async() => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(meanings);

  useEffect(() => {
    dictionaryApi();
  }, [word, category]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff'
      }
    },
  });

  const ThemeChanger = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: pink[600],
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: pink[600],
    },
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <div 
        className='App'
        style={{
          height: "100vh",
          backgroundColor: lightMode ? "#FFF" : "#282c34",
          color: lightMode ? "black" : "white",
          transition: "all 0.5s linear"
        }}
      >
        <Container 
          maxWidth="md" 
          style={{display: "flex", flexDirection: "column", height: "100vh", justifyContent: "space-evenly"}}
        >
          <div
            style={{position: "absolute", top: 0, right: 15, paddingTop: 10}}
          >
            <span>{lightMode ? "Light" : "Dark"} Mode</span>
            <ThemeChanger checked={lightMode} onChange={()=> setLightMode(!lightMode)}/>
          </div>
          <Header
            category={category}
            setCategory={setCategory}
            word={word}
            setWord={setWord}
            lightMode={lightMode}
          />
          {meanings && (
            <Definitions word={word} meanings={meanings} category={category}/>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
