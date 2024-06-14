import './App.css'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SuperheroComponent from './components/SuperheroComponent'
import ListSuperheroesComponent from './components/ListSuperheroesComponent'
import PowerComponent from './components/PowerComponent'
import ListPowersComponent from './components/ListPowersComponent'

function App() {

  return (
    <>
    
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path='/' element={<ListSuperheroesComponent/>}></Route>
        <Route path='/create-superhero' element = {<SuperheroComponent/>}></Route>
        <Route path='/update-superhero/:id' element = {<SuperheroComponent/>}></Route>
        <Route path='/powers' element = {<ListPowersComponent/>}></Route>
        <Route path='/add-power' element = {<PowerComponent/>}></Route>
        <Route path='/update-power/:power_id' element = {<PowerComponent/>}></Route>
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
    </>
  )
}

export default App
