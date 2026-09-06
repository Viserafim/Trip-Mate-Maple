import React, {useEffect, useMemo, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Home,
  Map,
  MapPin,
  Menu,
  Move,
  Plus,
  Route,
  Trash2,
  X
} from 'lucide-react'
import './styles.css'

const STORAGE_KEY='tripmate-days-v4'

const initialDays=[
  {date:'07/09/2026',title:'Chegada em Barrie',city:'Barrie',activities:[
    {time:'15:00',title:'Chegada e acomodação',place:'Barrie',duration:'2h',type:'Viagem',priority:'Alta',info:'Chegada em Barrie e acomodação.'}
  ]},
  {date:'08/09/2026',title:'Barrie Downtown + Waterfront',city:'Barrie',activities:[
    {time:'09:00',title:'Barrie Downtown',place:'Downtown Barrie',duration:'2h',type:'Passeio',priority:'Média',info:'Explorar o centro de Barrie.'},
    {time:'11:30',title:'Barrie Waterfront',place:'Barrie Waterfront',duration:'2h',type:'Natureza',priority:'Alta',info:'Passeio pela orla do Lake Simcoe.'}
  ]},
  {date:'09/09/2026',title:'Toronto — CN Tower + Ripley’s',city:'Toronto',activities:[
    {time:'09:00',title:'CN Tower',place:'CN Tower',duration:'2h',type:'Passeio',priority:'Alta',info:'Visita à CN Tower.'},
    {time:'11:30',title:'Ripley’s Aquarium',place:'Ripley’s Aquarium of Canada',duration:'2h',type:'Passeio',priority:'Alta',info:'Aquário próximo à CN Tower.'},
    {time:'14:00',title:'Toronto Waterfront',place:'Toronto Waterfront',duration:'2h',type:'Natureza',priority:'Média',info:'Passeio pela região do waterfront.'}
  ]},
  {date:'10/09/2026',title:'Barrie — descanso e compras',city:'Barrie',activities:[
    {time:'10:00',title:'Dia livre / compras',place:'Barrie',duration:'4h',type:'Livre',priority:'Baixa',info:'Dia flexível para descanso e compras.'}
  ]},
  {date:'11/09/2026',title:'Niagara Falls + Niagara-on-the-Lake',city:'Natureza',activities:[
    {time:'08:00',title:'Niagara Falls',place:'Niagara Falls',duration:'3h',type:'Natureza',priority:'Alta',info:'Explorar as cataratas.'},
    {time:'13:00',title:'Niagara-on-the-Lake',place:'Niagara-on-the-Lake',duration:'3h',type:'Passeio',priority:'Alta',info:'Passeio pela cidade histórica.'}
  ]},
  {date:'12/09/2026',title:'Toronto Islands + Harbourfront + Distillery',city:'Toronto',activities:[
    {time:'09:00',title:'Toronto Islands',place:'Toronto Islands',duration:'3h',type:'Natureza',priority:'Alta',info:'Passeio pelas ilhas.'},
    {time:'13:00',title:'Harbourfront',place:'Harbourfront',duration:'2h',type:'Passeio',priority:'Média',info:'Região do waterfront.'},
    {time:'16:00',title:'Distillery District',place:'Distillery District',duration:'2h',type:'Passeio',priority:'Alta',info:'Visita ao Distillery District.'}
  ]},
  {date:'13/09/2026',title:'Canada’s Wonderland',city:'Toronto',activities:[
    {time:'10:00',title:'Canada’s Wonderland',place:'Canada’s Wonderland',duration:'8h',type:'Passeio',priority:'Alta',info:'Dia completo no parque.'}
  ]},
  {date:'14/09/2026',title:'Dia coringa / clima',city:'Toronto',activities:[
    {time:'10:00',title:'Dia coringa',place:'Toronto',duration:'6h',type:'Livre',priority:'Média',info:'Dia reservado para ajustes de roteiro ou clima.'}
  ]},
  {date:'15/09/2026',title:'ROM + Yorkville + Blue Jays',city:'Toronto',activities:[
    {time:'10:00',title:'Royal Ontario Museum',place:'Royal Ontario Museum',duration:'3h',type:'Passeio',priority:'Alta',info:'Visita ao ROM.'},
    {time:'14:00',title:'Yorkville',place:'Yorkville',duration:'2h',type:'Passeio',priority:'Média',info:'Passeio pela região.'},
    {time:'19:07',title:'Blue Jays',place:'Rogers Centre',duration:'3h',type:'Esporte',priority:'Alta',info:'Jogo dos Blue Jays.'}
  ]},
  {date:'16/09/2026',title:'Barrie — descanso',city:'Barrie',activities:[
    {time:'10:00',title:'Dia livre',place:'Barrie',duration:'4h',type:'Livre',priority:'Baixa',info:'Descanso e atividades flexíveis.'}
  ]},
  {date:'17/09/2026',title:'Casa Loma + Spadina + Toronto',city:'Toronto',activities:[
    {time:'10:00',title:'Casa Loma',place:'Casa Loma',duration:'3h',type:'Passeio',priority:'Alta',info:'Visita à Casa Loma.'},
    {time:'14:00',title:'Spadina',place:'Spadina',duration:'2h',type:'Passeio',priority:'Média',info:'Explorar a região.'}
  ]},
  {date:'18/09/2026',title:'Blue Mountain + Collingwood + Wasaga Beach',city:'Natureza',activities:[
    {time:'09:00',title:'Blue Mountain',place:'Blue Mountain',duration:'3h',type:'Natureza',priority:'Alta',info:'Passeio em Blue Mountain.'},
    {time:'13:00',title:'Collingwood',place:'Collingwood',duration:'2h',type:'Passeio',priority:'Média',info:'Passeio pela cidade.'},
    {time:'16:00',title:'Wasaga Beach',place:'Wasaga Beach',duration:'2h',type:'Natureza',priority:'Alta',info:'Visita à praia.'}
  ]},
  {date:'19/09/2026',title:'Niagara Falls + Cruise + Journey Behind the Falls',city:'Natureza',activities:[
    {time:'08:00',title:'Niagara Falls',place:'Niagara Falls',duration:'2h',type:'Natureza',priority:'Alta',info:'Explorar as cataratas.'},
    {time:'10:30',title:'Cruise',place:'Niagara Falls',duration:'1h',type:'Passeio',priority:'Alta',info:'Cruzeiro pelas cataratas.'},
    {time:'13:00',title:'Journey Behind the Falls',place:'Niagara Falls',duration:'2h',type:'Passeio',priority:'Alta',info:'Atração Journey Behind the Falls.'}
  ]},
  {date:'20/09/2026',title:'Barrie — descanso',city:'Barrie',activities:[
    {time:'10:00',title:'Dia livre',place:'Barrie',duration:'4h',type:'Livre',priority:'Baixa',info:'Último dia livre em Barrie.'}
  ]},
  {date:'21/09/2026',title:'Retorno — Barrie → aeroporto',city:'Barrie',activities:[
    {time:'08:00',title:'Saída de Barrie',place:'Barrie',duration:'4h',type:'Viagem',priority:'Alta',info:'Retorno ao aeroporto.'}
  ]}
]

function parseDate(date){
  const [d,m,y]=date.split('/').map(Number)
  return new Date(y,m-1,d)
}

function sortDays(list){
  return [...list].sort((a,b)=>parseDate(a.date)-parseDate(b.date))
}

function dateToISO(date){
  const [d,m,y]=date.split('/').map(Number)
  return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`
}

function isoToBR(iso){
  const [y,m,d]=iso.split('-')
  return `${d}/${m}/${y}`
}

const natureTerms=[
  'niagara',
  'blue mountain',
  'wasaga',
  'lake simcoe',
  'waterfront',
  'islands',
  'natureza',
  'parque',
  'montanha',
  'praia',
  'falls',
  'cruise',
  'cataratas'
]

function matchesFilter(day,filter){
  if(filter==='Todos') return true

  const text=(
    day.title+' '+
    day.city+' '+
    day.activities.map(a=>a.place+' '+a.title).join(' ')
  ).toLowerCase()

  if(filter==='Barrie') return day.city==='Barrie' || text.includes('barrie')

  if(filter==='Toronto'){
    return day.city==='Toronto' ||
      /toronto|cn tower|ripley|rom|yorkville|casa loma|spadina|blue jays/.test(text)
  }

  if(filter==='Natureza'){
    return natureTerms.some(t=>text.includes(t))
  }

  return true
}

function App(){
  const [days,setDays]=useState(()=>{
    try{
      const saved=localStorage.getItem(STORAGE_KEY)
      return saved ? sortDays(JSON.parse(saved)) : initialDays
    }catch{
      return initialDays
    }
  })

  const [view,setView]=useState(()=>{
    const params=new URLSearchParams(window.location.search)
    return params.get('view')==='roteiro' ? 'roteiro' : 'roteiro'
  })

  const [selected,setSelected]=useState(null)
  const [filter,setFilter]=useState('Todos')
  const [movingDay,setMovingDay]=useState(null)

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(days))
  },[days])

  useEffect(()=>{
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('/Trip-Mate-Maple/sw.js',{
        scope:'/Trip-Mate-Maple/'
      }).catch(()=>{})
    }
  },[])

  function updateDays(next){
    setDays(sortDays(next))
  }

  function toggleComplete(date){
    updateDays(days.map(d=>
      d.date===date ? {...d,completed:!d.completed} : d
    ))
  }

  function deleteActivity(date,index){
    const next=days.map(d=>{
      if(d.date!==date) return d
      return {
        ...d,
        activities:d.activities.filter((_,i)=>i!==index)
      }
    })
    updateDays(next)
  }

  function addActivity(date,activity){
    updateDays(days.map(d=>
      d.date===date
        ? {...d,activities:[...d.activities,activity]}
        : d
    ))
  }

  function moveWholeDay(sourceDate,newDate,mode='move'){
    if(sourceDate===newDate) return

    const source=days.find(d=>d.date===sourceDate)
    const destination=days.find(d=>d.date===newDate)

    if(!source) return

    if(!destination){
      updateDays(
        days.map(d=>
          d.date===sourceDate
            ? {...d,date:newDate}
            : d
        )
      )
      setSelected({...source,date:newDate})
      setMovingDay(null)
      return
    }

    if(mode==='swap'){
      const next=days.map(d=>{
        if(d.date===sourceDate){
          return {...d,date:newDate}
        }

        if(d.date===newDate){
          return {...d,date:sourceDate}
        }

        return d
      })

      updateDays(next)
      setSelected({...source,date:newDate})
      setMovingDay(null)
      return
    }

    if(mode==='merge'){
      const mergedActivities=[
        ...destination.activities,
        ...source.activities
      ]

      const next=days.map(d=>{
        if(d.date===newDate){
          return {
            ...d,
            activities:mergedActivities
          }
        }

        if(d.date===sourceDate){
          return {
            ...d,
            title:'Dia livre / ajustes',
            city:d.city || 'Livre',
            activities:[]
          }
        }

        return d
      })

      updateDays(next)
      setSelected({
        ...destination,
        activities:mergedActivities
      })
      setMovingDay(null)
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="leaf"></span>
          <div>
            <strong>TripMate</strong>
            <small>Canadá 2026</small>
          </div>
        </div>
      </header>

      <main className="content">
        {view==='inicio' && (
          <HomeScreen
            days={days}
            onOpen={()=>setView('roteiro')}
          />
        )}

        {view==='roteiro' && (
          <Schedule
            days={days}
            filter={filter}
            setFilter={setFilter}
            onSelect={setSelected}
          />
        )}

        {view==='mapa' && (
          <MapScreen days={days}/>
        )}

        {view==='mais' && (
          <MoreScreen/>
        )}
      </main>

      <BottomNav view={view} setView={setView}/>

      {selected && (
        <DayDetail
          day={selected}
          onClose={()=>setSelected(null)}
          onMove={()=>setMovingDay(selected)}
          onToggleComplete={()=>{
            toggleComplete(selected.date)
            setSelected(prev=>prev ? {...prev,completed:!prev.completed}:prev)
          }}
          onDelete={(index)=>{
            deleteActivity(selected.date,index)
            setSelected(prev=>prev ? {
              ...prev,
              activities:prev.activities.filter((_,i)=>i!==index)
            }:prev)
          }}
          onAdd={(activity)=>{
            addActivity(selected.date,activity)
            setSelected(prev=>prev ? {
              ...prev,
              activities:[...prev.activities,activity]
            }:prev)
          }}
        />
      )}

      {movingDay && (
        <MoveDayModal
          day={movingDay}
          days={days}
          onClose={()=>setMovingDay(null)}
          onMove={moveWholeDay}
        />
      )}
    </div>
  )
}

function HomeScreen({days,onOpen}){
  const completed=days.filter(d=>d.completed).length

  return (
    <section>
      <div className="hero">
        <div className="hero-content">
          <span className="eyebrow">SUA VIAGEM</span>
          <h1>Canadá<br/>2026</h1>
          <p>Seu roteiro completo na palma da mão.</p>
          <button className="primary" onClick={onOpen}>
            Abrir roteiro <ChevronRight size={18}/>
          </button>
        </div>
      </div>

      <div className="stats">
        <div>
          <strong>{days.length}</strong>
          <span>dias</span>
        </div>
        <div>
          <strong>{completed}</strong>
          <span>concluídos</span>
        </div>
        <div>
          <strong>{days.reduce((n,d)=>n+d.activities.length,0)}</strong>
          <span>atividades</span>
        </div>
      </div>

      <div className="section-title">
        <div>
          <span className="eyebrow">PRÓXIMOS PASSOS</span>
          <h2>Seu roteiro</h2>
        </div>
      </div>

      <button className="next-card" onClick={onOpen}>
        <CalendarDays size={22}/>
        <div>
          <strong>{days[0]?.title}</strong>
          <span>{days[0]?.date}</span>
        </div>
        <ChevronRight/>
      </button>
    </section>
  )
}

function Schedule({days,filter,setFilter,onSelect}){
  const filters=['Todos','Barrie','Toronto','Natureza']

  const visible=useMemo(
    ()=>days.filter(d=>matchesFilter(d,filter)),
    [days,filter]
  )

  return (
    <section>
      <div className="page-title">
        <span className="eyebrow">ROTEIRO</span>
        <h1>Itinerário</h1>
        <p>Organize e acompanhe cada dia da viagem.</p>
      </div>

      <div className="filters">
        {filters.map(f=>(
          <button
            key={f}
            className={filter===f?'active':''}
            onClick={()=>setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="day-list">
        {visible.map(day=>(
          <button
            className="day-card"
            key={day.date}
            onClick={()=>onSelect(day)}
          >
            <div className="day-date">
              <strong>{day.date.slice(0,5)}</strong>
              <span>{day.date.slice(6)}</span>
            </div>

            <div className="day-info">
              <strong>{day.title}</strong>
              <span>
                <MapPin size={13}/>
                {day.city}
              </span>
              <small>{day.activities.length} atividades</small>
            </div>

            {day.completed
              ? <CheckCircle2 className="completed-icon"/>
              : <ChevronRight/>
            }
          </button>
        ))}
      </div>
    </section>
  )
}

function DayDetail({
  day,
  onClose,
  onMove,
  onToggleComplete,
  onDelete,
  onAdd
}){
  const [showAdd,setShowAdd]=useState(false)

  return (
    <div className="modal-backdrop">
      <div className="modal day-modal">
        <div className="modal-header">
          <div>
            <span className="eyebrow">{day.date}</span>
            <h2>{day.title}</h2>
            <p>{day.city}</p>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X/>
          </button>
        </div>

        <div className="activity-list">
          {day.activities.length===0 && (
            <div className="empty-state">
              <CalendarDays size={28}/>
              <strong>Dia livre</strong>
              <span>Nenhuma atividade programada.</span>
            </div>
          )}

          {day.activities.map((a,index)=>(
            <div className="activity-card" key={`${a.title}-${index}`}>
              <div className="activity-time">
                <Clock3 size={15}/>
                {a.time}
              </div>

              <div className="activity-main">
                <strong>{a.title}</strong>

                <span>
                  <MapPin size={13}/>
                  {a.place}
                </span>

                {a.info && <p>{a.info}</p>}

                <div className="activity-meta">
                  <span>{a.duration}</span>
                  <span>{a.type}</span>
                  <span>{a.priority}</span>
                </div>
              </div>

              <button
                className="delete-button"
                onClick={()=>onDelete(index)}
                title="Excluir atividade"
              >
                <Trash2 size={16}/>
              </button>
            </div>
          ))}
        </div>

        <div className="detail-actions">
          <button className="secondary" onClick={onMove}>
            <Move size={17}/>
            Mover dia
          </button>

          <button className="secondary" onClick={()=>setShowAdd(true)}>
            <Plus size={17}/>
            Adicionar
          </button>
        </div>

        <button
          className={`complete-button ${day.completed?'done':''}`}
          onClick={onToggleComplete}
        >
          <CheckCircle2 size={18}/>
          {day.completed ? 'Dia concluído' : 'Marcar dia como concluído'}
        </button>

        {showAdd && (
          <AddActivityModal
            onClose={()=>setShowAdd(false)}
            onAdd={activity=>{
              onAdd(activity)
              setShowAdd(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

function AddActivityModal({onClose,onAdd}){
  const [form,setForm]=useState({
    time:'10:00',
    title:'',
    place:'',
    duration:'2h',
    type:'Passeio',
    priority:'Média',
    info:''
  })

  function change(key,value){
    setForm(prev=>({...prev,[key]:value}))
  }

  function submit(e){
    e.preventDefault()

    if(!form.title.trim()) return

    onAdd(form)
  }

  return (
    <div className="modal-backdrop nested">
      <div className="modal small-modal">
        <div className="modal-header">
          <div>
            <span className="eyebrow">NOVA ATIVIDADE</span>
            <h2>Adicionar</h2>
          </div>

          <button className="icon-button" onClick={onClose}>
            <X/>
          </button>
        </div>

        <form onSubmit={submit} className="form">
          <label>
            Nome
            <input
              value={form.title}
              onChange={e=>change('title',e.target.value)}
              placeholder="Ex.: CN Tower"
            />
          </label>

          <label>
            Local
            <input
              value={form.place}
              onChange={e=>change('place',e.target.value)}
              placeholder="Ex.: Toronto"
            />
          </label>

          <div className="form-row">
            <label>
              Horário
              <input
                type="time"
                value={form.time}
                onChange={e=>change('time',e.target.value)}
              />
            </label>

            <label>
              Duração
              <input
                value={form.duration}
                onChange={e=>change('duration',e.target.value)}
              />
            </label>
          </div>

          <label>
            Tipo
            <select
              value={form.type}
              onChange={e=>change('type',e.target.value)}
            >
              <option>Passeio</option>
              <option>Natureza</option>
              <option>Viagem</option>
              <option>Esporte</option>
              <option>Compras</option>
              <option>Livre</option>
            </select>
          </label>

          <label>
            Prioridade
            <select
              value={form.priority}
              onChange={e=>change('priority',e.target.value)}
            >
              <option>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </select>
          </label>

          <label>
            Observação
            <textarea
              value={form.info}
              onChange={e=>change('info',e.target.value)}
              placeholder="Informações adicionais"
            />
          </label>

          <button className="primary full" type="submit">
            Adicionar atividade
          </button>
        </form>
      </div>
    </div>
  )
}

function MoveDayModal({day,days,onClose,onMove}){
  const [newDate,setNewDate]=useState('')

  const dateOptions=days
    .map(d=>d.date)
    .filter(d=>d!==day.date)

  // Garante também as datas que ainda não possuem roteiro.
  const allDates=[]
  const start=new Date(2026,8,7)
  const end=new Date(2026,8,21)

  for(
    let current=new Date(start);
    current<=end;
    current.setDate(current.getDate()+1)
  ){
    const date=`${String(current.getDate()).padStart(2,'0')}/${String(current.getMonth()+1).padStart(2,'0')}/${current.getFullYear()}`
    if(date!==day.date) allDates.push(date)
  }

  const destinationExists=days.some(d=>d.date===newDate)

  function submit(){
    if(!newDate) return

    if(destinationExists){
      onClose()
      setTimeout(()=>{
        const confirmed=window.confirm(
          `A data ${newDate.slice(0,5)} já possui um roteiro.\n\n`+
          `OK = Trocar os dias\n`+
          `Cancelar = Mesclar os roteiros`
        )

        if(confirmed){
          onMove(day.date,newDate,'swap')
        }else{
          const mergeConfirm=window.confirm(
            `Mesclar o roteiro de ${day.date.slice(0,5)} com ${newDate.slice(0,5)}?\n\n`+
            `As atividades dos dois dias serão preservadas. `+
            `A data de origem ficará como "Dia livre / ajustes".`
          )

          if(mergeConfirm){
            onMove(day.date,newDate,'merge')
          }
        }
      },50)

      return
    }

    onMove(day.date,newDate,'move')
  }

  return (
    <div className="modal-backdrop nested">
      <div className="modal small-modal">
        <div className="modal-header">
          <div>
            <span className="eyebrow">MOVER DIA</span>
            <h2>{day.title}</h2>
            <p>Atual: {day.date}</p>
          </div>

          <button className="icon-button" onClick={onClose}>
            <X/>
          </button>
        </div>

        <div className="move-icon">
          <Move size={28}/>
        </div>

        <label className="move-label">
          Nova data
          <select
            value={newDate}
            onChange={e=>setNewDate(e.target.value)}
          >
            <option value="">Selecione uma data</option>

            {allDates.map(date=>{
              const exists=dateOptions.includes(date)

              return (
                <option key={date} value={date}>
                  {date.slice(0,5)}
                  {exists ? ' — já possui roteiro' : ' — livre'}
                </option>
              )
            })}
          </select>
        </label>

        {destinationExists && newDate && (
          <div className="conflict-box">
            <strong>⚠️ Essa data já possui atividades.</strong>
            <p>
              Você poderá trocar os dias ou mesclar os roteiros.
              Nenhuma atividade será apagada automaticamente.
            </p>
          </div>
        )}

        <div className="move-actions">
          <button className="secondary" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="primary"
            disabled={!newDate}
            onClick={submit}
          >
            <Move size={17}/>
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}

function MapScreen({days}){
  const places=days.flatMap(d=>
    d.activities.map(a=>({
      ...a,
      date:d.date
    }))
  )

  function openMaps(place){
    const url=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`
    window.open(url,'_blank')
  }

  return (
    <section>
      <div className="page-title">
        <span className="eyebrow">MAPA</span>
        <h1>Locais</h1>
        <p>Acesse rapidamente os locais do seu roteiro.</p>
      </div>

      <div className="place-list">
        {places.map((p,index)=>(
          <button
            className="place-card"
            key={`${p.place}-${index}`}
            onClick={()=>openMaps(p.place)}
          >
            <MapPin size={20}/>
            <div>
              <strong>{p.place}</strong>
              <span>{p.date.slice(0,5)} · {p.title}</span>
            </div>
            <ChevronRight/>
          </button>
        ))}
      </div>
    </section>
  )
}

function MoreScreen(){
  return (
    <section>
      <div className="page-title">
        <span className="eyebrow">TRIPMATE</span>
        <h1>Mais</h1>
        <p>Configurações e informações do aplicativo.</p>
      </div>

      <div className="more-card">
        <Route size={24}/>
        <div>
          <strong>TripMate</strong>
          <p>
            Seu roteiro é salvo no próprio aparelho e pode continuar
            funcionando offline.
          </p>
        </div>
      </div>
    </section>
  )
}

function BottomNav({view,setView}){
  const items=[
    ['inicio','Início',Home],
    ['roteiro','Roteiro',CalendarDays],
    ['mapa','Mapa',Map],
    ['mais','Mais',Menu]
  ]

  return (
    <nav className="bottom-nav">
      {items.map(([id,label,Icon])=>(
        <button
          key={id}
          className={view===id?'active':''}
          onClick={()=>setView(id)}
        >
          <Icon size={21}/>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
