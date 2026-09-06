import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Plus,
  ArrowLeft,
  Check,
  Map,
  Home,
  Navigation,
  Pencil,
  Trash2,
  ExternalLink,
  Menu,
  X,
  MoreHorizontal,
  Search,
  Info,
  Move
} from 'lucide-react';
import './styles.css';

const initialDays = [
  {date:'07/09/2026',dow:'Segunda-feira',title:'Chegada em Barrie',city:'Barrie',icon:'✈️',notes:'Chegada à noite, acomodação e descanso.',activities:[{time:'20:30',title:'Chegada à casa / acomodação',place:'Barrie',duration:'1h',desc:'Noite tranquila após a viagem.'}]},
  {date:'08/09/2026',dow:'Terça-feira',title:'Barrie: Downtown + Waterfront + Lake Simcoe',city:'Barrie',icon:'🌳',notes:'Dia leve para começar a viagem.',activities:[{time:'09:15',title:'Downtown Barrie',place:'Downtown Barrie',duration:'1h',desc:'Explorar a região, lojas e cafés.'},{time:'10:15',title:'Waterfront / Heritage Park',place:'Barrie Waterfront',duration:'1h30',desc:'Caminhada e fotos.'},{time:'11:45',title:'Passeio pela orla / Lake Simcoe',place:'Lake Simcoe',duration:'45 min',desc:'Passeio pela orla.'},{time:'12:30',title:'Almoço',place:'Downtown Barrie / Waterfront',duration:'1h30',desc:'Almoço na região.'},{time:'14:00',title:'Lojas / centro',place:'Downtown Barrie',duration:'1h30',desc:'Compras e passeio pelo centro.'},{time:'15:30',title:'Lake Simcoe / retorno pela orla',place:'Barrie',duration:'1h30',desc:'Finalizar o dia com passeio pela orla.'}]},
  {date:'09/09/2026',dow:'Quarta-feira',title:"Toronto: CN Tower + Ripley's + Waterfront",city:'Toronto',icon:'🗼',notes:'Começar cedo para aproveitar as atrações.',activities:[{time:'07:15',title:'Saída de Barrie',place:'Barrie → Toronto',duration:'~2h',desc:'Deslocamento de carro.'},{time:'09:15',title:'CN Tower',place:'Downtown Toronto',duration:'1h30',desc:'Mirante e principais áreas da atração.'},{time:'10:50',title:"Ripley's Aquarium",place:'Downtown Toronto',duration:'1h40',desc:'Visita ao aquário.'},{time:'12:45',title:'Almoço',place:'Harbourfront / Downtown',duration:'1h15',desc:'Almoço na região.'},{time:'14:00',title:'Waterfront / Harbourfront',place:'Toronto Waterfront',duration:'1h30',desc:'Caminhada e fotos.'},{time:'15:30',title:'Downtown',place:'Downtown Toronto',duration:'1h30',desc:'Passeio pelo centro.'},{time:'17:00',title:'Café / lanche',place:'Downtown',duration:'1h',desc:'Pausa antes do retorno.'}]},
  {date:'10/09/2026',dow:'Quinta-feira',title:'Barrie: dia livre / descanso / compras',city:'Barrie',icon:'🛍️',notes:'Dia de recuperação e flexibilidade.',activities:[{time:'09:30',title:'Manhã livre',place:'Barrie',duration:'2h',desc:'Descanso ou atividade espontânea.'},{time:'11:30',title:'Compras / centro',place:'Barrie',duration:'2h',desc:'Compras e passeio.'},{time:'14:00',title:'Tarde livre',place:'Barrie',duration:'3h',desc:'Descanso ou ajustes do roteiro.'}]},
  {date:'11/09/2026',dow:'Sexta-feira',title:'Niagara Falls + Niagara-on-the-Lake',city:'Niagara Falls',icon:'💦',notes:"Roteiro principal do dia. Opção alternativa: Canada's Wonderland.",activities:[{time:'06:30',title:'Saída de Barrie',place:'Barrie → Niagara Falls',duration:'~2h',desc:'Deslocamento de carro.'},{time:'09:00',title:'Niagara Falls',place:'Table Rock / Fallsview',duration:'2h',desc:'Cataratas, mirantes e fotos.'},{time:'12:00',title:'Almoço',place:'Table Rock / Fallsview',duration:'1h15',desc:'Almoço próximo às cataratas.'},{time:'13:15',title:'Niagara-on-the-Lake',place:'Niagara-on-the-Lake',duration:'2h',desc:'Centro histórico e passeio.'},{time:'16:00',title:'Retorno a Barrie',place:'Niagara → Barrie',duration:'~2h',desc:'Retorno.'}]},
  {date:'12/09/2026',dow:'Sábado',title:'Toronto Islands + Harbourfront + Distillery District',city:'Toronto',icon:'🏝️',notes:'Chegar cedo ao ferry.',activities:[{time:'07:00',title:'Saída de Barrie',place:'Barrie → Toronto',duration:'~2h',desc:'Deslocamento.'},{time:'09:30',title:'Toronto Islands',place:'Toronto Islands',duration:'3h',desc:'Ferry, ilhas, caminhada e vistas do skyline.'},{time:'12:30',title:'Almoço',place:'Toronto Islands',duration:'1h',desc:'Almoço na região.'},{time:'13:30',title:'Harbourfront',place:'Harbourfront',duration:'2h',desc:'Passeio pela orla.'},{time:'15:30',title:'Distillery District',place:'Distillery District',duration:'2h',desc:'Arquitetura, lojas e cafés.'}]},
  {date:'13/09/2026',dow:'Domingo',title:"Canada's Wonderland",city:'Vaughan',icon:'🎢',notes:'Dia inteiro no parque.',activities:[{time:'08:00',title:'Saída de Barrie',place:'Barrie → Vaughan',duration:'~1h',desc:'Deslocamento.'},{time:'09:15',title:"Canada's Wonderland",place:'Vaughan',duration:'dia inteiro',desc:'Parque, atrações e áreas temáticas.'},{time:'13:00',title:'Almoço',place:'Dentro do parque',duration:'1h',desc:'Almoço no parque.'}]},
  {date:'14/09/2026',dow:'Segunda-feira',title:'Dia coringa / ajustes conforme clima',city:'Livre',icon:'☀️',notes:'Reservar para clima, descanso ou repetir uma atração.',activities:[{time:'09:00',title:'Manhã livre',place:'Barrie',duration:'2h',desc:'Descanso.'},{time:'11:00',title:'Compras / Barrie',place:'Barrie',duration:'2h',desc:'Compras ou passeio.'},{time:'14:30',title:'Atividade conforme clima',place:'A definir',duration:'2h30',desc:'Usar este espaço para ajustes.'}]},
  {date:'15/09/2026',dow:'Terça-feira',title:'ROM + Yorkville + Blue Jays às 19h07',city:'Toronto',icon:'⚾',notes:'O jogo é o compromisso principal.',activities:[{time:'07:30',title:'Saída de Barrie',place:'Barrie → Toronto',duration:'~2h',desc:'Deslocamento.'},{time:'09:30',title:'Royal Ontario Museum',place:'Toronto',duration:'2h30',desc:'Visita ao ROM.'},{time:'12:00',title:'Almoço',place:'Yorkville / Bloor',duration:'1h15',desc:'Almoço na região.'},{time:'13:15',title:'Yorkville',place:'Yorkville',duration:'1h45',desc:'Passeio pela região.'},{time:'15:00',title:'Café / descanso',place:'Yorkville',duration:'1h',desc:'Pausa.'},{time:'16:00',title:'Deslocamento para estádio',place:'Yorkville → Rogers Centre',duration:'30 min',desc:'Ir com antecedência.'},{time:'16:30',title:'Jantar / lanche',place:'Rogers Centre',duration:'1h',desc:'Alimentação antes do jogo.'},{time:'19:07',title:'Blue Jays',place:'Rogers Centre',duration:'~3h',desc:'Jogo às 19h07.'}]},
  {date:'16/09/2026',dow:'Quarta-feira',title:'Barrie: dia livre / descanso',city:'Barrie',icon:'☕',notes:'Dia de recuperação.',activities:[{time:'09:30',title:'Manhã livre',place:'Barrie',duration:'3h',desc:'Descanso.'},{time:'13:00',title:'Almoço',place:'Barrie',duration:'1h30',desc:'Almoço.'},{time:'14:30',title:'Tarde livre',place:'Barrie',duration:'3h',desc:'Descanso ou passeio.'}]},
  {date:'17/09/2026',dow:'Quinta-feira',title:'Casa Loma + Spadina + Toronto complementar',city:'Toronto',icon:'🏰',notes:'Dia cultural.',activities:[{time:'07:30',title:'Saída de Barrie',place:'Barrie → Toronto',duration:'~2h',desc:'Deslocamento.'},{time:'09:30',title:'Casa Loma',place:'Toronto',duration:'2h',desc:'Visita ao castelo.'},{time:'12:00',title:'Almoço',place:'Spadina / Bloor / Kensington',duration:'1h',desc:'Almoço na região.'},{time:'13:00',title:'Spadina',place:'Spadina',duration:'1h30',desc:'Passeio pela região.'},{time:'14:30',title:'Toronto complementar',place:'Toronto',duration:'2h30',desc:'Escolher pontos próximos conforme disposição.'}]},
  {date:'18/09/2026',dow:'Sexta-feira',title:'Blue Mountain + Collingwood + Wasaga Beach',city:'Blue Mountain',icon:'🏔️',notes:'Dia de natureza.',activities:[{time:'08:00',title:'Saída de Barrie',place:'Barrie → Blue Mountain',duration:'~1h15',desc:'Deslocamento.'},{time:'09:15',title:'Blue Mountain Village',place:'Blue Mountain',duration:'2h15',desc:'Passeio pelo Village.'},{time:'11:30',title:'Atividades da montanha',place:'Blue Mountain',duration:'1h30',desc:'Atividades e mirantes.'},{time:'13:00',title:'Almoço',place:'Blue Mountain Village',duration:'1h',desc:'Almoço.'},{time:'14:00',title:'Atividades / caminhada',place:'Blue Mountain',duration:'1h30',desc:'Caminhada.'},{time:'15:30',title:'Passeio',place:'Collingwood',duration:'1h',desc:'Centro de Collingwood.'},{time:'16:30',title:'Wasaga Beach',place:'Wasaga Beach',duration:'1h',desc:'Parada na praia.'}]},
  {date:'19/09/2026',dow:'Sábado',title:'Niagara Falls + Cruise + Journey Behind the Falls',city:'Niagara Falls',icon:'🚢',notes:'Dia longo.',activities:[{time:'06:30',title:'Saída de Barrie',place:'Barrie → Niagara Falls',duration:'~2h',desc:'Deslocamento.'},{time:'09:00',title:'Niagara Falls',place:'Niagara Falls',duration:'1h30',desc:'Mirantes.'},{time:'10:30',title:'Cruise',place:'Niagara Falls',duration:'1h',desc:'Cruzeiro pelas cataratas.'},{time:'12:00',title:'Almoço',place:'Fallsview / Table Rock',duration:'1h15',desc:'Almoço.'},{time:'13:15',title:'Journey Behind the Falls',place:'Niagara Falls',duration:'1h30',desc:'Experiência atrás das cataratas.'},{time:'15:00',title:'Passeio livre',place:'Niagara Falls',duration:'1h30',desc:'Fotos e pontos próximos.'},{time:'17:00',title:'Retorno a Barrie',place:'Niagara → Barrie',duration:'~2h',desc:'Retorno.'}]},
  {date:'20/09/2026',dow:'Domingo',title:'Barrie: dia livre / compras',city:'Barrie',icon:'🧳',notes:'Último dia. Organizar malas.',activities:[{time:'09:30',title:'Dia livre',place:'Barrie',duration:'3h',desc:'Passeio leve.'},{time:'13:00',title:'Almoço',place:'Barrie',duration:'1h30',desc:'Almoço.'},{time:'14:30',title:'Compras / organização',place:'Barrie',duration:'2h30',desc:'Últimas compras e malas.'}]},
  {date:'21/09/2026',dow:'Segunda-feira',title:'Retorno — Barrie → aeroporto',city:'Retorno',icon:'✈️',notes:'Calcular saída conforme horário do voo.',activities:[{time:'Manhã',title:'Saída de Barrie',place:'Barrie → aeroporto',duration:'—',desc:'Retorno ao aeroporto.'}]}
];

const key = 'tripmate-lite-days-v1';

const natureTerms = [
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
];

function matchesFilter(day,filter){
  if(filter === 'Todos') return true;

  if(filter === 'Barrie'){
    return day.city === 'Barrie' ||
      /barrie/i.test(
        day.title + ' ' +
        day.activities.map(a=>a.place).join(' ')
      );
  }

  if(filter === 'Toronto'){
    return day.city === 'Toronto' ||
      /toronto|cn tower|ripley|rom|yorkville|casa loma|spadina|blue jays/i.test(
        day.title + ' ' +
        day.activities.map(a=>a.place).join(' ')
      );
  }

  if(filter === 'Natureza'){
    return natureTerms.some(term =>
      new RegExp(term,'i').test(
        day.title + ' ' +
        day.activities.map(
          a=>a.place+' '+a.title
        ).join(' ')
      )
    );
  }

  return true;
}

function load(){
  try{
    return JSON.parse(
      localStorage.getItem(key)
    ) || initialDays;
  }catch{
    return initialDays;
  }
}

function mapsUrl(place){
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
}

function App(){

  useEffect(()=>{
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register(
        '/Trip-Mate-Maple/sw.js',
        {
          scope:'/Trip-Mate-Maple/'
        }
      ).catch(()=>{});
    }
  },[]);

  const params =
    new URLSearchParams(
      window.location.search
    );

  const initialTab =
    params.get('view') === 'inicio'
      ? 'inicio'
      : 'roteiro';

  const [days,setDays] =
    useState(load);

  const [tab,setTab] =
    useState(initialTab);

  const [routeFilter,setRouteFilter] =
    useState('Todos');

  const [selected,setSelected] =
    useState(null);

  const [editing,setEditing] =
    useState(null);

  const [showForm,setShowForm] =
    useState(false);

  const [movingDay,setMovingDay] =
    useState(null);

  const [done,setDone] =
    useState(
      () => JSON.parse(
        localStorage.getItem(
          'tripmate-done'
        ) || '{}'
      )
    );

  useEffect(()=>{
    localStorage.setItem(
      key,
      JSON.stringify(days)
    );
  },[days]);

  useEffect(()=>{
    localStorage.setItem(
      'tripmate-done',
      JSON.stringify(done)
    );
  },[done]);

  const today =
    days.find(d=>!done[d.date]) ||
    days[1];

  const completed =
    Object.values(done)
      .filter(Boolean)
      .length;

  const addActivity =
    (dayDate,activity)=>
      setDays(ds =>
        ds.map(d =>
          d.date === dayDate
            ? {
                ...d,
                activities:[
                  ...d.activities,
                  activity
                ].sort(
                  (a,b)=>
                    String(a.time)
                      .localeCompare(
                        String(b.time)
                      )
                )
              }
            : d
        )
      );

  const updateActivity =
    (dayDate,index,activity)=>
      setDays(ds =>
        ds.map(d =>
          d.date === dayDate
            ? {
                ...d,
                activities:
                  d.activities.map(
                    (a,i)=>
                      i === index
                        ? activity
                        : a
                  )
              }
            : d
        )
      );

  const deleteActivity =
    (dayDate,index)=>
      setDays(ds =>
        ds.map(d =>
          d.date === dayDate
            ? {
                ...d,
                activities:
                  d.activities.filter(
                    (_,i)=>i !== index
                  )
              }
            : d
        )
      );

  function moveWholeDay(newDate){

    if(!movingDay) return;

    if(newDate === movingDay.date){
      alert(
        'Escolha uma data diferente da atual.'
      );
      return;
    }

    const destination =
      days.find(d=>d.date === newDate);

    if(destination){
      alert(
        `A data ${newDate.slice(0,5)} já possui um roteiro. Na próxima etapa vamos tratar a opção de mesclar ou trocar os dias.`
      );
      return;
    }

    const updated =
      days.map(d =>
        d.date === movingDay.date
          ? {
              ...d,
              date:newDate
            }
          : d
      );

    updated.sort(
      (a,b)=>
        parseDate(a.date) -
        parseDate(b.date)
    );

    setDays(updated);

    setSelected(
      updated.find(
        d=>d.date === newDate
      ) || null
    );

    setMovingDay(null);
  }

  function parseDate(date){
    const [day,month,year] =
      date.split('/').map(Number);

    return new Date(
      year,
      month-1,
      day
    ).getTime();
  }

  return (
    <div className="app">

      <header className="topbar">

        <div className="brand">

          <span className="leaf"></span>

          <div>
            <b>
              Trip<span>Mate</span>
            </b>
          </div>

        </div>

        <button
          className="iconBtn"
          onClick={() =>
            alert(
              'TripMate salva o roteiro no próprio aparelho.'
            )
          }
        >
          <Menu size={21}/>
        </button>

      </header>

      {tab === 'inicio' && (
        <HomeScreen
          day={today}
          completed={completed}
          onOpen={()=>{
            setTab('roteiro');
            setSelected(today);
          }}
        />
      )}

      {tab === 'roteiro' && !selected && (
        <Schedule
          days={days}
          done={done}
          filter={routeFilter}
          setFilter={setRouteFilter}
          onSelect={setSelected}
        />
      )}

      {tab === 'roteiro' && selected && (
        <DayDetail
          day={selected}
          done={!!done[selected.date]}
          onBack={()=>setSelected(null)}
          onDone={() =>
            setDone(x=>({
              ...x,
              [selected.date]:
                !x[selected.date]
            }))
          }
          onMove={() =>
            setMovingDay(selected)
          }
          onAdd={()=>{
            setEditing({
              day:selected,
              date:selected.date,
              index:null
            });
            setShowForm(true);
          }}
          onEdit={(i)=>{
            setEditing({
              day:selected,
              date:selected.date,
              index:i
            });
            setShowForm(true);
          }}
          onDelete={(i)=>
            deleteActivity(
              selected.date,
              i
            )
          }
        />
      )}

      {tab === 'mapa' && (
        <MapScreen days={days}/>
      )}

      {tab === 'mais' && (
        <MoreScreen
          completed={completed}
          days={days}
        />
      )}

      <nav className="bottom">

        <button
          className={
            tab === 'inicio'
              ? 'active'
              : ''
          }
          onClick={()=>{
            setTab('inicio');
            setSelected(null);
          }}
        >
          <Home/>
          <span>Início</span>
        </button>

        <button
          className={
            tab === 'roteiro'
              ? 'active'
              : ''
          }
          onClick={()=>{
            setTab('roteiro');
            setSelected(null);
          }}
        >
          <CalendarDays/>
          <span>Roteiro</span>
        </button>

        <button
          className={
            tab === 'mapa'
              ? 'active'
              : ''
          }
          onClick={()=>{
            setTab('mapa');
            setSelected(null);
          }}
        >
          <Map/>
          <span>Mapa</span>
        </button>

        <button
          className={
            tab === 'mais'
              ? 'active'
              : ''
          }
          onClick={()=>{
            setTab('mais');
            setSelected(null);
          }}
        >
          <MoreHorizontal/>
          <span>Mais</span>
        </button>

      </nav>

      {showForm && (
        <ActivityForm
          initial={
            editing.index !== null
              ? editing.day.activities[
                  editing.index
                ]
              : null
          }
          onClose={()=>
            setShowForm(false)
          }
          onSave={(a)=>{

            if(editing.index !== null){
              updateActivity(
                editing.date,
                editing.index,
                a
              );
            }else{
              addActivity(
                editing.day.date,
                a
              );
            }

            setShowForm(false);
          }}
        />
      )}

      {movingDay && (
        <MoveDayModal
          day={movingDay}
          days={days}
          onClose={() =>
            setMovingDay(null)
          }
          onMove={moveWholeDay}
        />
      )}

    </div>
  );
}

function HomeScreen({
  day,
  completed,
  onOpen
}){
  return (
    <main>

      <section className="hero">

        <div className="heroPhoto">

          <div className="heroBadge">
            TRIPMATE · CANADÁ
          </div>

          <div className="heroOverlay">

            <span>🍁</span>

            <h1>
              Canadá 2026
            </h1>

            <p>
              Barrie + Toronto
            </p>

            <small>
              <CalendarDays size={14}/>
              07/09 → 21/09/2026
            </small>

          </div>

          <div className="heroPin">
            Toronto
          </div>

        </div>

        <div className="nextCard">

          <div className="eyebrow">
            PRÓXIMO DIA
          </div>

          <div className="date">
            {day.date.slice(0,5)}
            <span>
              • {day.dow}
            </span>
          </div>

          <h2>
            {day.icon} {day.title}
          </h2>

          <p>
            {day.activities.length} atividades · roteiro offline
          </p>

          <button
            className="primary"
            onClick={onOpen}
          >
            Ver roteiro
            <ChevronRight size={18}/>
          </button>

        </div>

        <div className="stats">

          <div>
            <strong>15</strong>
            <span>dias</span>
          </div>

          <div>
            <strong>14</strong>
            <span>roteiros</span>
          </div>

          <div>
            <strong>{completed}</strong>
            <span>concluídos</span>
          </div>

        </div>

      </section>

    </main>
  );
}

function Schedule({
  days,
  done,
  filter,
  setFilter,
  onSelect
}){
  const filtered =
    days.filter(
      d=>matchesFilter(d,filter)
    );

  return (
    <main className="content">

      <div className="pageTitle">

        <div>

          <div className="eyebrow">
            CANADÁ 2026
          </div>

          <h1>
            Roteiro da viagem
          </h1>

          <p>
            Explore o roteiro por região ou veja tudo em ordem.
          </p>

        </div>

        <div className="routeSearch">
          <Search size={17}/>
          <span>
            {filtered.length}{' '}
            {filtered.length === 1
              ? 'dia'
              : 'dias'}
          </span>
        </div>

      </div>

      <div className="filter">

        {[
          'Todos',
          'Barrie',
          'Toronto',
          'Natureza'
        ].map(f=>(
          <button
            type="button"
            key={f}
            className={
              `pill ${
                filter === f
                  ? 'active'
                  : ''
              }`
            }
            onClick={()=>
              setFilter(f)
            }
          >
            {f}
          </button>
        ))}

      </div>

      <div className="filterHint">
        {filter === 'Todos'
          ? 'Todos os dias da viagem'
          : `Mostrando apenas: ${filter}`}
      </div>

      <div className="dayList">

        {filtered.map(d=>(

          <button
            className={
              `dayRow ${
                done[d.date]
                  ? 'isDone'
                  : ''
              }`
            }
            key={d.date}
            onClick={()=>
              onSelect(d)
            }
          >

            <div className="dateBox">
              <b>
                {d.date.slice(0,2)}
              </b>
              <small>
                {d.date.slice(3,5)}
              </small>
            </div>

            <div className="dayIcon">
              {d.icon}
            </div>

            <div className="dayText">

              <small>
                {d.dow}
              </small>

              <strong>
                {d.title}
              </strong>

              <span>
                {d.city}
              </span>

            </div>

            <ChevronRight size={19}/>

          </button>

        ))}

      </div>

      {filtered.length === 0 && (
        <div className="emptyState">
          Nenhum dia encontrado nesta categoria.
        </div>
      )}

    </main>
  );
}

function DayDetail({
  day,
  done,
  onBack,
  onDone,
  onMove,
  onAdd,
  onEdit,
  onDelete
}){
  return (
    <main className="detail">

      <button
        className="back"
        onClick={onBack}
      >
        <ArrowLeft size={19}/>
        Roteiro
      </button>

      <div className="detailHead">

        <div className="eyebrow">
          {day.date} · {day.dow}
        </div>

        <h1>
          {day.icon} {day.title}
        </h1>

        <p>
          {day.notes}
        </p>

      </div>

      <div className="timeline">

        {day.activities.map((a,i)=>(

          <div
            className="activity"
            key={i}
          >

            <div className="time">

              <b>
                {a.time}
              </b>

              <span></span>

            </div>

            <div className="activityCard">

              <div className="cardTop">

                <h3>
                  {a.title}
                </h3>

                <button
                  className="miniEdit"
                  onClick={()=>
                    onEdit(i)
                  }
                >
                  <Pencil size={15}/>
                </button>

              </div>

              <p>
                <MapPin size={14}/>
                {a.place}
              </p>

              <p>
                <Clock3 size={14}/>
                {a.duration}
              </p>

              <div className="actions">

                <a
                  href={mapsUrl(a.place)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Navigation size={15}/>
                  Maps
                </a>

                <button
                  onClick={()=>
                    onDelete(i)
                  }
                >
                  <Trash2 size={15}/>
                  Excluir
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="detailActions">

        <button
          className="secondary"
          onClick={onMove}
        >
          <Move size={18}/>
          Mover dia
        </button>

        <button
          className="primary"
          onClick={onAdd}
        >
          <Plus size={18}/>
          Adicionar
        </button>

      </div>

      <div className="detailActions">

        <button
          className={`primary ${
            done ? 'done' : ''
          }`}
          onClick={onDone}
        >
          <Check size={18}/>
          {done
            ? 'Dia concluído'
            : 'Marcar como concluído'}
        </button>

      </div>

    </main>
  );
}

function MoveDayModal({
  day,
  days,
  onClose,
  onMove
}){

  const availableDates =
    days.filter(
      d=>d.date !== day.date
    );

  const [newDate,setNewDate] =
    useState(
      availableDates[0]?.date || ''
    );

  return (
    <div className="modal">

      <div className="sheet">

        <div className="sheetHead">

          <h2>
            Mover dia
          </h2>

          <button
            className="iconBtn"
            onClick={onClose}
          >
            <X/>
          </button>

        </div>

        <p
          style={{
            color:'#718097',
            fontSize:'13px',
            lineHeight:'1.45'
          }}
        >
          Você está movendo:
          <br/>
          <strong>
            {day.date.slice(0,5)} · {day.title}
          </strong>
        </p>

        <label>
          Nova data

          <select
            value={newDate}
            onChange={e=>
              setNewDate(e.target.value)
            }
            style={{
              display:'block',
              width:'100%',
              marginTop:'6px',
              border:'1px solid #dbe2ec',
              borderRadius:'11px',
              padding:'11px',
              font:'inherit',
              fontSize:'13px',
              background:'#fff'
            }}
          >

            {availableDates.map(d=>(
              <option
                key={d.date}
                value={d.date}
              >
                {d.date.slice(0,5)} · {d.dow}
              </option>
            ))}

          </select>

        </label>

        <button
          className="primary full"
          disabled={!newDate}
          onClick={()=>
            onMove(newDate)
          }
        >
          Mover dia
        </button>

      </div>

    </div>
  );
}

function MapScreen({days}){

  return (
    <main className="content">

      <div className="pageTitle">

        <div className="eyebrow">
          MAPA
        </div>

        <h1>
          Locais do roteiro
        </h1>

        <p>
          Abra cada ponto diretamente no Google Maps.
        </p>

      </div>

      <div className="mapCard">

        <div className="fakeMap">

          <span>📍 Barrie</span>
          <span>📍 Toronto</span>
          <span>📍 Blue Mountain</span>
          <span>📍 Niagara Falls</span>

          <div className="routeLine"></div>

        </div>

      </div>

      <div className="placeList">

        {days
          .flatMap(
            d=>d.activities.map(
              a=>a.place
            )
          )
          .filter(
            (x,i,a)=>
              x &&
              a.indexOf(x) === i
          )
          .slice(0,18)
          .map(p=>(

            <a
              key={p}
              href={mapsUrl(p)}
              target="_blank"
              rel="noreferrer"
            >

              <MapPin size={17}/>

              <span>
                {p}
              </span>

              <ExternalLink size={15}/>

            </a>

          ))}

      </div>

    </main>
  );
}

function ActivityForm({
  initial,
  onClose,
  onSave
}){

  const [a,setA] =
    useState(
      initial || {
        time:'09:00',
        title:'',
        place:'',
        duration:'1h',
        desc:''
      }
    );

  return (
    <div className="modal">

      <div className="sheet">

        <div className="sheetHead">

          <h2>
            {initial
              ? 'Editar atividade'
              : 'Nova atividade'}
          </h2>

          <button
            className="iconBtn"
            onClick={onClose}
          >
            <X/>
          </button>

        </div>

        <label>
          Horário

          <input
            value={a.time}
            onChange={e=>
              setA({
                ...a,
                time:e.target.value
              })
            }
          />

        </label>

        <label>
          Nome

          <input
            autoFocus
            value={a.title}
            onChange={e=>
              setA({
                ...a,
                title:e.target.value
              })
            }
          />

        </label>

        <label>
          Local

          <input
            value={a.place}
            onChange={e=>
              setA({
                ...a,
                place:e.target.value
              })
            }
          />

        </label>

        <label>
          Duração

          <input
            value={a.duration}
            onChange={e=>
              setA({
                ...a,
                duration:e.target.value
              })
            }
          />

        </label>

        <label>
          Descrição

          <textarea
            rows="3"
            value={a.desc}
            onChange={e=>
              setA({
                ...a,
                desc:e.target.value
              })
            }
          />

        </label>

        <button
          className="primary full"
          disabled={!a.title.trim()}
          onClick={()=>
            onSave(a)
          }
        >
          Salvar atividade
        </button>

      </div>

    </div>
  );
}

function MoreScreen({
  completed,
  days
}){

  return (
    <main className="content more">

      <div className="pageTitle">

        <div>

          <div className="eyebrow">
            TRIPMATE
          </div>

          <h1>
            Mais
          </h1>

          <p>
            Informações rápidas sobre seu roteiro.
          </p>

        </div>

      </div>

      <div className="moreHero">

        <div className="moreIcon">
          🍁
        </div>

        <div>

          <strong>
            Canadá 2026
          </strong>

          <span>
            Barrie + Toronto · 15 dias
          </span>

        </div>

      </div>

      <div className="infoList">

        <div>

          <Info size={18}/>

          <span>

            <b>
              Roteiro offline
            </b>

            <small>
              Suas alterações ficam salvas neste aparelho.
            </small>

          </span>

        </div>

        <div>

          <Check size={18}/>

          <span>

            <b>
              {completed} dias concluídos
            </b>

            <small>
              Marque cada dia conforme avançar na viagem.
            </small>

          </span>

        </div>

        <div>

          <CalendarDays size={18}/>

          <span>

            <b>
              {days.length} dias planejados
            </b>

            <small>
              De 07/09 a 21/09/2026.
            </small>

          </span>

        </div>

      </div>

    </main>
  );
}

createRoot(
  document.getElementById('root')
).render(
  <App/>
);
