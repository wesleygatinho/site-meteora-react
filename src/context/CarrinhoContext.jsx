import { createContext, useEffect, useReducer, useState } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducer";
import { useMemo } from "react";

export const  CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";
const estadoInicial = [];
export const CarrinhoProvider = ({children}) =>{
    const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial)
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);

    const { totalTemp, quantidadeTemp } = useMemo(() => {
        return carrinho.reduce((acumulador, produto) => ({
            quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
            totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
        }), {
            quantidadeTemp: 0,
            totalTemp: 0,
        });
    })

    useEffect(() => {
        setQuantidade(quantidadeTemp);
        setValorTotal(totalTemp);
    }, [carrinho])

    return(
        <CarrinhoContext.Provider value={{carrinho, dispatch, quantidade, valorTotal,}}>
            {children}
        </CarrinhoContext.Provider>

    )
}