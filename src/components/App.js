import styled from "styled-components"
import GlobalStyle from "./GlobalStyle"
import palavras from './palavras'
import alfabeto from './alfabeto'
import React from "react"

function Imagem(props) {
    return <img src={`assets/forca${props.erros}.png`} />
}

function Letra(props) {
    return <LetraStyle><p>{props.letra.toUpperCase()}</p></LetraStyle>
}

function Chute() {
    return (
        <span>
            <span>Já sei a palavra!</span>
            <input></input>
            <button>Chutar</button>
        </span>
    )
}

export default function App() {

    const [erros, setErros] = React.useState(0)
    const [palavraEscolhida, setPalavraEscolhida] = React.useState([])
    const [palavraEscondida, setPalavraEscondida] = React.useState([])
    const [letrasEscolhidas, setLetrasEscolhidas] = React.useState([])

    function escolherPalavra() {
        const palavra = palavras[Math.floor(Math.random() * 231)].split('')
        setPalavraEscolhida(palavra)
        setPalavraEscondida(palavra.map(l => '_ '))
    }

    function escolherLetra(l, palavraEscolhida) {
        setLetrasEscolhidas([...letrasEscolhidas, l])
        console.log(palavraEscolhida)
        if (palavraEscolhida.includes(l)) {
            let palavra = [...palavraEscondida]
            for (let i=0; i<palavraEscolhida.length; i++) {
                if (palavraEscolhida[i] === l) {
                    palavra[i] = l
                    setPalavraEscondida(palavra)
                }
            }
        } else {
            setErros(erros + 1)
        }
    }

    return (
        <Wrapper>
            <GlobalStyle />
            <Visual>
                <Imagem erros={erros} />
                <Palavra>
                    <Escolha onClick={escolherPalavra}><p>Escolher Palavra</p></Escolha>
                    {palavraEscondida.length > 0 ? palavraEscondida : ''}
                </Palavra>
            </Visual>
            <Acertos>
                <Alfabeto>
                    {alfabeto.map(l => <LetraStyle onClick={() => escolherLetra(l, palavraEscolhida)} palavraEscolhida={palavraEscolhida}><p>{l.toUpperCase()}</p></LetraStyle>)}
                </Alfabeto>
                <Chute />
            </Acertos>
        </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
flex-direction: column;
background-color: red;

img {
    width: 500px;
}
`

const Visual = styled.div`
display: flex;
justify-content: center;
gap: 150px;
background-color: blue;
margin-bottom: 20px
`

const Escolha = styled.button`
background-color: #27AE60;
color: white;
width: 200px;
height: 50px;
border: none;
border-radius: 10px;
margin-top: 50px;
cursor: pointer;

p {
    font-size: 18px;
    font-weight: 700
}
`

const Palavra = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`

const Acertos = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Alfabeto = styled.div`
display: flex;
width: 750px;
flex-wrap: wrap;
gap: 5px
`

const LetraStyle = styled.button`
width: 50px;
height: 50px;
display: flex;
justify-content: center;
align-items: center;
background-color: #E1ECF4;
color: #39739D;
border: 1px solid #7CA8C8;
border-radius: 5px;
cursor: ${props => props.palavraEscolhida.length > 0 ? 'pointer' : ''};

&:disabled: ${props => props.palavraEscolhida.length > 0 ? false : true};

p {
    font-weight: 700;
    font-size: 16px
}
`