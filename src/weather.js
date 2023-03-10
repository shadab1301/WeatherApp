import React, { useEffect, useState ,useRef} from 'react'
import styled from "styled-components"
import axios from "axios";

const Container = styled.div`
  padding:20px 0px;
  margin:0px auto;
  width:30%;
  border:1px dashed black;
  border-radius:20px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%)
`
const TempratureBox = styled.div`
    width:80%;
    height:auto;
    border:1px solid black;
    border-radius:20px;
    margin:30px auto;
    background-color:#C5C5C5
    
`
const OtherDataBox = styled.div`
    width:100%;
   
    `
const Row = styled.div`
    display:flex;
    width:100%;
   
`
const DataBox = styled.div`  
    width:50%;
    display:flex;
    justify-content:space-between;
    border-bottom:1px dashed black;
    margin:0px 30px 0px 30px;
    padding:10px 0px

`
const Item = styled.div`
    width:50%;
`
const SearchBox=styled.div`
    width:80%;
    margin:20px auto;
    padding:10px 20px;
    display:flex;
    justify-content:space-around;
`
const Button=styled.div`
    display:inline-block;
    padding:8px 40px;
    border:1px solid green;
    border-radius:20px;
    cursor:pointer;
    font-weight:bold;
    margin:0px 0px 0px 20px;
    :hover{
        background-color:green;
        color:white;
        border-radius:20px;
    }
`
const InputClass={
    border:"none",
    borderBottom:"1px dashed black",
    width:"70%",
}
const Weather = () => {
    const [inputCity, setInputCity] = useState("delhi")
    const [data, setData] = useState({})
    const [countryOption, setcountryOption] = useState({})
  
    const apiKey = "f56f24967aaf51182d1d4df628297c6d"
    const handleChangeInput = (e) => {
      
        console.log("value", e.target.value)
        setInputCity(e.target.value)
    }

useEffect(()=>{
    getWetherDetails(inputCity)
},[])
const loadData=async()=>{
   
}
    const handleSearch = () => {
        getWetherDetails(inputCity)
    }

    const getWetherDetails = async (cityName) => {
        if (!cityName) return
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey

        let res = await axios.get(apiURL)
        console.log(res)
        console.log(res.status)
        if (res.status == 200) {
            console.log(res.data)
            setData(res.data)
        }
    
    }
    const unixTimeConverter=(time)=>{
        let tempObj=new Date(time * 1000)
        return tempObj.toLocaleTimeString("default")
    }
    return (
        <Container>
            <h3 style={{ textAlign: "center", padding: "10px 0px" }}>Weather App</h3>

            <SearchBox>
                <input type="text"  className='inputBox' style={InputClass} value={inputCity} onChange={handleChangeInput} />
                <Button onClick={handleSearch}>Search</Button>
            </SearchBox>
            {Object.keys(data).length > 0 && <>

                <TempratureBox>
                    <h5 style={{ margin: "10px 20px" }}>{data.name} , {data.sys.country}. Weather</h5>
                    <h3 style={{ textAlign: "center" }}>{((data?.main?.temp) - 273.15).toFixed(2)}°C   <img style={{width:"50px",height:"50px"}} src={`http://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`}/></h3>
                    <h5 style={{ margin: "10px 20px" }}>{data.weather[0].main}</h5>
                    
                </TempratureBox>
                <OtherDataBox>
                    <Row>
                        <DataBox>
                            <Item>High/Low</Item>
                            <Item>{((data?.main?.temp_max) - 273.15).toFixed(0)}/{((data?.main?.temp_min) - 273.15).toFixed(0)}</Item>
                        </DataBox>
                        <DataBox>
                            <Item>Wind</Item>
                            <Item>{data?.wind?.speed} Km/hr</Item>
                        </DataBox>
                    </Row>
                    <Row>
                        <DataBox>
                            <Item>Humidity</Item>
                            <Item> {data?.main?.humidity} %</Item>
                        </DataBox>
                        <DataBox>
                            <Item>Wind direction</Item>
                            <Item>{data?.wind?.deg} deg</Item>
                        </DataBox>
                    </Row>
                    <Row>
                        <DataBox>
                            <Item>Pressure</Item>
                            <Item> {data?.main?.pressure} Hpa</Item>
                        </DataBox>
                        <DataBox>
                            <Item>Sunrise</Item>
                            <Item>{unixTimeConverter(data.sys.sunrise)}</Item>
                        </DataBox>
                    </Row>
                    <Row>
                        <DataBox>
                            <Item>visibility</Item>
                            <Item>{data?.visibility / 1000} km</Item>
                        </DataBox>
                        <DataBox>
                            <Item>Sunset</Item>
                            <Item> {unixTimeConverter(data.sys.sunset)}</Item>
                        </DataBox>
                    </Row>
                </OtherDataBox>



            </>}

        </Container>
    )
}

export default Weather
