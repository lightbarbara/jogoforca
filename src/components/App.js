import styled from "styled-components"
import GlobalStyle from "./GlobalStyle"
import palavras from './palavras'
import alfabeto from './alfabeto'
import React from "react"

function Imagem(props) {
    return <img data-identifier='game-image' src={`assets/forca${props.erros}.png`} />
}

export default function App() {

    const [erros, setErros] = React.useState(0)
    const [palavraEscolhida, setPalavraEscolhida] = React.useState([])
    const [palavraEscondida, setPalavraEscondida] = React.useState([])
    const [letrasEscolhidas, setLetrasEscolhidas] = React.useState([])
    const [palavraChutada, setPalavraChutada] = React.useState([])

    function escolherPalavra() {
        setErros(0)
        setLetrasEscolhidas([])
        const palavra = palavras[Math.floor(Math.random() * 231)].split('')
        setPalavraEscolhida(palavra)
        setPalavraEscondida(palavra.map(l => ' _ '))
    }

    function escolherLetra(l) {
        setLetrasEscolhidas([...letrasEscolhidas, l])
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
            if (erros + 1 === 6) {
                setPalavraEscondida(palavraEscolhida)
            }
        }
    }

    function checaPalavraChutada() {
        if (palavraEscolhida.join() === palavraChutada.join()) {
            setPalavraEscondida(palavraChutada)
        } else {
            setErros(6)
            setPalavraEscondida(palavraEscolhida)
        }
    }

    return (
        <Wrapper>
            <GlobalStyle />
            <Visual>
                <Imagem erros={erros} />
                <Palavra palavraEscolhida={palavraEscolhida} palavraEscondida={palavraEscondida} erros={erros}>
                    <Escolha data-identifier='choose-word' onClick={escolherPalavra}>Escolher Palavra</Escolha>
                    {palavraEscondida.length > 0 ? <p data-identifier='word'>{palavraEscondida}</p> : ''}
                </Palavra>
            </Visual>
            <Acertos>
                <Alfabeto>
                    {alfabeto.map(l => <LetraStyle data-identifier='letter' disabled={letrasEscolhidas.includes(l) || palavraEscolhida.length === 0 || erros === 6 || (palavraEscolhida.join() === palavraEscondida.join() && erros < 6) ? true : false} onClick={() => escolherLetra(l, palavraEscolhida)} palavraEscolhida={palavraEscolhida}><p>{l.toUpperCase()}</p></LetraStyle>)}
                </Alfabeto>
                <Chute>
                    <span>Já sei a palavra!</span>
                    <input data-identifier='type-guess' disabled={palavraEscolhida.length === 0 || erros === 6 || (palavraEscolhida.join() === palavraEscondida.join() && erros < 6) ? true : false} onChange={e => setPalavraChutada(e.target.value.split(''))}/>
                    <button data-identifier='guess-button' onClick={checaPalavraChutada}>Chutar</button>
                </Chute>
            </Acertos>
        </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
flex-direction: column;

img {
    width: 500px;
}
`

const Visual = styled.div`
display: flex;
justify-content: center;
gap: 150px;
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
font-size: 18px;
font-weight: 700
`

const Palavra = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
padding-bottom: 20px;
color: ${props => (props.palavraEscolhida.join() === props.palavraEscondida.join() && props.erros < 6) ? '#27AE60' : props.erros === 6 ? 'red' : 'black'};
font-weight: 700;

p {
    font-size: 50px;
}
`

const Acertos = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 25px;
`

const Alfabeto = styled.div`
display: flex;
width: 750px;
flex-wrap: wrap;
gap: 5px;
`

const LetraStyle = styled.button`
width: 50px;
height: 50px;
display: flex;
justify-content: center;
align-items: center;
background-color: ${props => props.disabled ? '#9FAAB5' : '#E1ECF4'};
color: ${props => props.disabled ? '#7B838D' : '#39739D'};
border: 1px solid ${props => props.disabled ? '#9FAAB5' : '#7CA8C8'};
border-radius: 5px;
cursor: ${props => props.palavraEscolhida.length > 0 ? 'pointer' : ''};

p {
    font-weight: 700;
    font-size: 16px
}
`

const Chute = styled.div`
display: flex;
align-items: center;
gap: 10px;
font-size: 20px;

input {
    width: 400px;
    height: 27px;
    border-radius: 4px;
}

button {
    height: 37px;
    width: 70px;
    background-color: #E1ECF4;
    color: #39739D;
    border: 1px solid #7CA8C8;
    border-radius: 5px;
    cursor: pointer;
}
`