import styles from './lectures.module.css'
import Code from '@/app/codeSection';

var st =
`package main

import (
    "fmt"
    "log"
)

func main() {
    fmt.Println("input text:")
    var name string
    var country string
    n, err := fmt.Scanf("%s is born in %s", &name, &country)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("number of items read: %d\\n", n)
    fmt.Println(name, country)
}`

export default function Page() {
    return (
        <div className='content'>
            <h1>Чтение ввода из консоли </h1>
            <ul className={styles.ul}>
                <li>go install :: скачивает компилирует и устанавливает инструмент в католог $GoPATH</li>
                <li>@latest :: устанавливает последнюю версию</li>
            </ul>

            <h1>Встроенные Типы</h1>
            <ul className={styles.ul}>
                <li>по умолчанию присваивает нулевые значения</li>
                <li>литерал: это число символ или строка 
                    ( <span className={styles.emphasis}> 12</span>, 
                    <span className={styles.comment}> '@'</span>, 
                    <span className={styles.comment}> "привет" </span> )
                </li>
                <li>нет автомотического повышения типа, а преобразование можно произвести только явным образом </li>
                <li>из за отсутствия неявного преобразования 
                    <p style={{paddingLeft: "30px"}}>
                        <span className={styles.emphasis}>for(0)   {} </span>  
                        <span className={styles.comment}>//несработает потому что ожидает bool-евый тип </span>  
                    </p> 
                </li>
                <li>:= нельзя использовать вне фунций</li>
            </ul>
            
            <Code code={st} language="go"/> 
        </div>
    )
}