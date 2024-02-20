import styles from '../lectures.module.css'
import Code from '@/app/codeSection';

import Image from 'next/image';
import slise from '@/img/golang/slise.webp'

var codeVariadicFunction =
`//Объявление вариативных функций в Golang, принимающие переменное число аргументов.
func transform(prefix int, worlds ...string) bool{  //Доступно лишь для последнего параметра функции.
    return true
}
func main { 
	arr := [...]int{1,2,3,4,5,6} 
	_ := transform(12, arr...)
    //or
    _ := transform(12, 1, 2, 3, 4, 5)
}`

export default function Page() {
    return (
        <div className='content'>
            <h1>Встроенные Типы</h1>
            <ul className={styles.ol}>
                <li>по умолчанию присваивает нулевые значения</li>
                <li>литерал: это число символ или строка 
                    ( <span className={styles.spanEmphasis}> 12</span>, 
                    <span className={styles.spanComment}> '@'</span>, 
                    <span className={styles.spanComment}> "привет" </span> )
                </li>
                <li>В Go нет автомотического повышения типов. А преобразование должно производится явным образом. <br />
                    <span style={{paddingLeft: "1.5rem"}}>
                        <span className={styles.spanCode}> while(1)</span>  
                        <span className={styles.spanComment}>// числа не могут преобразоваться в логический тип </span>  
                    </span> 
                </li> 
                <li>способы обьявления типов: 
                    <span style={{paddingLeft: "1.5rem"}}>1) уневерсальный x := 1 </span>
                    <span style={{paddingLeft: "1.5rem"}}>2) с помощью ключевого слова var x = 20.</span>
                    <span style={{paddingLeft: "1.5rem"}}> 
                        <ul className={styles.ul}>
                            <li>var применяется в случаях когда нужно создать переменную с пустым значением,</li>
                            <li>когда нужен не тот тип литерала (var x byte = 97 //a),</li>
                            <li>чтобы избавиться от затенения.  := нельзя использовать вне фунций</li>
                        </ul>
                        
                        
                    </span>
                </li>
            </ul>

            <h2>Базовый</h2>
            <ol className={styles.ol}>
                <li>Логический: <span className={styles.spanEmphasis}> bool </span></li>
                <li> Целочисленные: 
                    <ul className={styles.ul}>
                        <li> Знаковые:<span className={styles.spanEmphasis}>  int  </span> 8,16,32,64. Записаные в виде: 
                            <span className={styles.spanComment}> 0b001 </span> -- двоич. 
                            <span className={styles.spanComment}> 0o017 </span> -- восмерич.
                            <span className={styles.spanComment}> 0x0A5 </span> -- шеснадц.
                            <span className={styles.spanComment}> 1_000_000 </span> -- разделенным 
                        </li>
                        <li>Беззнаковые: <span className={styles.spanEmphasis}>uint</span> 8,16,32,64 </li>
                        <li>Указатель: <span className={styles.spanEmphasis}> uintptr </span> </li>
                        <li>Псевдонимы:  <span className={styles.spanEmphasis}>byte, rune</span> rune можно записать в виде 
                            <span className={styles.spanComment}>'a'</span> -- сивол
                            <span className={styles.spanComment}>'\141'</span>  -- восмерич
                            <span className={styles.spanComment}>'\x61'</span>  -- шеснадц
                            <span className={styles.spanComment}>'\u0041'</span> -- 16-разряд. восмерич 
                            <span className={styles.spanComment}>'\U00000041'</span> -- 32-разряд. восмерич
                        </li>
                    </ul>
                </li> 
                <li> Вещественные: 
                    <span className={styles.spanEmphasis}> float32</span> - точностью до знаков 7 после запятой -3.4028235E+38 <br />
                    <span className={styles.spanEmphasis}> float64</span> - точностью 15 после запятой 1.7976931348623157E+308
                </li>
                <li>  Комплексные: 
                    <div>
                        <Code code={'import \'math.cmplx\' \nx := complex(2.5, 3.1)'} language="go"/> 
                    </div>
                    
                </li>
                <li> Строки: <span className={styles.spanEmphasis}> string</span>  строка представляет слайс байтов, но является immutable объектом (неизменяемой).</li>       
            </ol>

            <h2>Составной</h2>
            <p>
                <span className={styles.spanEmphasis}> Массив: </span>
                Структура последовательно хранящая в памяти значения определенного типа. 
                При обращении к элементу массива происходит умножение нашего индекса, на размер типа элемента которые хранит массив.
                прибавив полученное число к адресу массива, получим адрес элемента в пямяти.
                Масивы это сравнымые типы, будут равны если у них одинаковые типы и длина.
                При указании длины нельзя использовать переменную потому что массив инициализируется на этапе компиляции.
            </p>
            <div>
                <Code language="go" code={
                    '//Разряженный массив: \n' + 
                    'var x := [12]int{1, 5:2, 8:3, 4} // [1,0,0,0,0,2,0,0,3,4,0,0]\n\n' + 
                    '//Нотация ... используется для указания длины, равной количеству элементов в литерале\n' +
                    'var x := [...]int{33,12,3,4,5,6}'
                } />
            </div>
            
            <p>
                <span className={styles.spanEmphasis}> 
                    <a href="https://golangify.com/array-append-make">Срез: </a>     
                </span>
                представляет динамический массив элементов хранящихся в памяти. Срез представляет собой структуру, 
                в которой содержится указатель на начало области памяти (массива), длина слайса (length) и объем области памяти (capacity). 
                Поэтому срез не хранит никаких данных,а лишь описывается раздел опорного массива. 
                Если длина превысит емкость, выделяется новый массив в <span className={styles.spanComment}>2 раза</span>  больше, 
                если <span className={styles.spanComment}>len(slise) {'>'} 1024 </span> элементов на <span className={styles.spanComment}>1/4</span>. 
                Если мамксималльная или приблизительная дллина массива зареннее известна, используйте функцию 
                <span className={styles.spanEmphasis}> make </span> для предварительного выделения, 
                чтобы избежать дополнительных перемещений и копий. слайсы можно сравнивать только с nil. 
                В остальных случаях можно использовать <span className={styles.spanCode}>reflect.DeepEqual</span>
            </p>
            
            <div>
                <Code language="go" code={
                    '//Третий параметр указывает емкость выходного среза: \n' + 
                    'arr := [...]byte{\'a\', \'b\', \'c\', \'d\', \'e\', \'f\'}\n' +
                    'sli := arr[1:2:4]      // ({b}, len=1, cap=3) \n' +
                    'sli = append(sli, \'+\') // ({b, +}, len=2, cap=3)\n' +
                    'sli = append(sli, \'-\') // ({b, +, -}, len=3, cap=3)\n' +
                    'sli = append(sli, \'=\') // Переполнится и вернет новый срез\n' +
                    'fmt.Printf("%c\\n", arr) // {a, b, +, -, e, f}\n\n' 
                    + codeVariadicFunction
                }/>
            </div>
            
            <Image 
                alt='Mount'
                src={slise}
                // sizes='48px'
                style={{
                    alignItems: "center",
                    margin: "30px auto",
                }}
            />

            <p>
            <a href="https://github.com/golang/go/blob/master/src/runtime/map.go#L115"> Map</a>
                : ассоциативный массив, структура данных, которая позволяет использовать 
                вместо целочисленных индексов какие-либо хешируемые структуры. 
                Для ключей карты всегда должен сохранятся принцип деретминированности 
                (один и тот же хеш для одного и тогоже ключа).
                
            </p>
            Процесс получения данных  из карты:
            <div className={styles.videoContainer}>
                <iframe  width="550" height="344" src="https://www.youtube.com/embed/P_SXTUiA-9Y?si=MQC_f13d8wCsdoG9" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            </div>
            
            {/* <div>
                <Code code={st} language="go"/> 
            </div> */}
        </div>
    )
}