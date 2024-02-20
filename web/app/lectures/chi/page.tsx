import styles from '../lectures.module.css'
import Code from '@/app/codeSection';

var codeChiRegular =
`//Объявление и определение параметров URL-адресса
r.Get("/user/{id:[0-9]+}/{name:[a-zA-Z]+}", func (w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
    name := chi.URLParam(r, "name")
    ...
})

// Для перечисления определенных значений, иначе маршрут не совпадет 
r.Get("/user/{id:(foo|bar|baz)}", handlerFunction)

// разделяемые передаваемые значения
r.Get("/user/{ids}", func (w http.ResponseWriter, r *http.Request) {
	ids := chi.URLParam(r, "ids")
	idList := strings.Split(ids, ",")
})`

var codeURLParam =
`//  /search?score=9%2C8&score=4,5,6&order=name
//по одному 
query := r.URL.Query().Get("score")
order := r.URL.Query().Get("order")

// перебрать все параметры в url
r.Get("/search", func(w http.ResponseWriter, r *http.Request) {
    type Condition struct {
        Name  string
        Value []string
    }
    var c []*Condition
    for k, v := range url {
		iterable := &Condition{Name: k, Value: v}
		c = append(c, iterable)
	}
    //  http://.../search?score=9%2C8&score=4,5,6&order=name ,  вернет:
    //  --"c[0]":{"Name":"order","Value":["rating"]}
    //  --"c[1]":{"Name":"score","Value":["9,8","4,5,6"]}
})`

var codeHandlerError =
`r.NotFound(func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(404)
    w.Write([]byte("route does not exist"))
})
r.MethodNotAllowed(func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(405)
    w.Write([]byte("method is not valid"))
})`

var codeGroupingRoutes = 
`router.Route("/users", func(r chi.Router) {
	r.Get("/{id}", getUser)
	r.Post("/", createUser)
	r.Put("/deactivate", deactivateUser)          
})`

var codeGroupingRoutes2 = 
`router.Group(func(r chi.Router) {
	r.Use(AuthMiddleware)
	r.Get("/users/{id}")
})`

export default function Page() {
    return (
        <div className='content'>
            <h1> HTTP-маршрутизатор Chi</h1>
            <p>
            <span className={styles.spanEmphasis}> chi </span>
            — это легкий, идиоматический и компонуемый маршрутизатор для создания HTTP-сервисов Go. 
            Он особенно полезен для написания больших сервисов REST API, 
            которые можно будет поддерживать по мере роста и изменений вашего проекта. 
            chi построен на новом context пакете, представленном в Go 1.7, для обработки сигналов,
            отмены и значений области запроса в цепочке обработчиков.
            </p>


            <h2> <span className={styles.hPretty}>
                Маршрутизация <a 
            href=""></a></span></h2>
            <p> <span className={styles.hPretty + " " + styles.spanEmphasis}>Chi </span>
            позволяет маршрутизировать/обрабатывать любой метод HTTP-запроса. 
            и даже свои собственные вызвав <span className={styles.spanCode}>chi.RegisterMethod("JELLO")</span>
            затем установив обработчик маршрутизации через <span className={styles.spanCode}>r.Method("JELLO", "/path", myJelloMethodHandler)</span>. 
            </p>
            <p>Каждый метод маршрутизации принимает URL-адрес patternи цепочку файлов handlers. 
            В библиотеке Chi for Go вы можете использовать маршрутизатор с поддержкой регулярных выражений для определения маршрутов 
            с динамическими параметрами. Вот пример создания хендлера с использованием регулярных выражений в Chi:
            </p>
            <div><Code language="go" code={codeChiRegular}/></div>


            <h2> <span className={styles.hPretty}>
                Обработка URL-запросов <a 
            href=""></a></span></h2>
            <p>URL-запросы необходимы для передачи неиерархических данных в URL-адресе. 
            Golang Chi не предоставляет встроенных функций специально для URL-запросов, 
            но вы можете легко получить к ним доступ с помощью стандартного пакета net/http.
            </p>
            <div> <Code language="go" code={codeURLParam}/> </div>
            
            <h2> <span className={styles.hPretty}> 
                Группировка маршрутов <a href=""></a></span></h2>
            <p>Chi предоставляет несколько способов группировки маршрутов.</p>
            <p>Использовав <span className={styles.spanCode}>chi.Route</span> функцию для создания подмаршрутов.</p>
            <div> <Code language="go" code={codeGroupingRoutes}/> </div>


            Либо сгруппировать маршруты, используя <span className={styles.spanCode}>chi.Group</span>.
            Он позволяет применять промежуточное программное обеспечение (например для авторизованных пользователей) 
            только к сгруппированным маршрутам.
            <div> <Code language="go" code={codeGroupingRoutes2}/> </div>

            <h2> <span className={styles.hPretty}>
                Создание собственных обработчиков 404 и 405 <a 
            href=""></a></span></h2>
            Возможность создавать пользовательские <span className={styles.spanCode}>http.StatusNotFound</span> и 
            <span className={styles.spanCode}>http.StatusMethodNotAllowed</span> обработчики 
            <div> <Code language="go" code={codeHandlerError}/> </div>


            
        </div>
    )
}