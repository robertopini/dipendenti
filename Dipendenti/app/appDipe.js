  
/* global Vue axios */ //> from vue.html
const $ = sel => document.querySelector(sel)
const GET = (url) => axios.get(url)
const POST = (cmd,data) => axios.post('/browse'+cmd,data)

const dipendenti = new Vue ({

    el:'#app',
    data: {
        list: []
    },
    methods: {
        async fetch (_filter='') {
            const {data} = await GET(`/dip/Dipendenti`)
            dipendenti.list = data.value
        },
    }
})

const dipartimenti = new Vue(
    {
        el: '#appDipa',
        data: {
            listDipa: []
        },
        methods: {
            async fetch(_filter=''){
                const {data} = await GET('/dip/Dipartimenti') 
                dipartimenti.listDipa = data.value
            },

        }

    }
)






// initially fill list of books
dipendenti.fetch()   
dipartimenti.fetch()
