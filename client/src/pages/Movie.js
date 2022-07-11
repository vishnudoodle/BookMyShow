import React, { useState, useEffect,useMemo } from 'react'
import Axios from '../config/axios'
import Sidebar from '../components/Sidebar';
import { Button, Container, Row, Col, Table, Card } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import {useTable , useSortBy} from 'react-table'
import { ArrowBarUp, ArrowBarDown } from 'react-bootstrap-icons'
const Movie = () => {
  const [movie, setmovie] = useState([])
  const [location, setlocation] = useState([])
  const fetchData = () =>{
    Axios.post('/movie/allmovie').then(res =>{
      setmovie(res.data)
    }).catch(e => console.log(e))
  }
  const fetchLocation = () =>{
    Axios.get('/location/alllocation').then(res =>{
      setlocation(res.data)
      console.log(res.data)
    }).catch(e => console.log(e))
  }
  useEffect(() => {
    fetchData()
    fetchLocation()
  }, [])
 
  const sortingName = () => {
    Axios.post('/movie/allmovie/?sortBy=name').then(res =>{
      setmovie(res.data)
    }).catch(e => console.log(e))
  }

  const sortingLanguage = () => {
    Axios.post('/movie/allmovie/?sortBy=language').then(res =>{
      setmovie(res.data)
    }).catch(e => console.log(e))
  }
  
  // const data = useMemo (()=>
  //   [
  //     {
  //         "_id": "62c3f009fb50eeb93fe93db8",
  //         "name": "vikram",
  //         "cast": [
  //             "kamal",
  //             "vijay sethupathi"
  //         ],
  //         "language": "tamil",
  //         "genre": "action",
  //         "location": [
  //             "62c3efe5fb50eeb93fe93db4"
  //         ],
  //         "createdAt": "2022-07-05T08:02:17.950Z",
  //         "updatedAt": "2022-07-05T08:02:17.950Z",
  //         "__v": 0
  //     },
  //     {
  //       "_id": "62c3f009fb50eeb93fe93db8",
  //       "name": "vikram",
  //       "cast": [
  //           "kamal",
  //           "vijay sethupathi"
  //       ],
  //       "language": "tamil",
  //       "genre": "action",
  //       "location": [
  //           "62c3efe5fb50eeb93fe93db4"
  //       ],
  //       "createdAt": "2022-07-05T08:02:17.950Z",
  //       "updatedAt": "2022-07-05T08:02:17.950Z",
  //       "__v": 0
  //   }
  //   ],[])
  
  // const columns = useMemo(()=>[
  //   {
  //     Header: "Name",
  //     accessor:"name"
  //   },
  //   {
  //     Header: "Cast",
  //     accessor:"cast"
  //   },
  // ],[])

  const MovieData = useMemo(() => [...movie], [movie])
  const MovieColumn = useMemo(() => movie[0]
    ?Object.keys(movie[0])
      .filter((key)=> key !== "location" && key !== "__v" && key !== "createdAt" && key !== "updatedAt")
        .map((key)=>{
          return {Header: key, accessor : key}
        }): [], 
    [movie]
  )

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns)=>[
      ...columns,
      {
        id: "Details",
        Header : "Details",
        Cell: (({ row }) => {
          return (
            <Button style={{ backgroundColor : '#262b40', borderColor:'#262b40'}} onClick={()=> alert(row.values._id )}>
              View Details
            </Button>
          )
        })
      }
    ])
  }
  const tableInstance = useTable(
    {
      columns :MovieColumn, 
      data : MovieData
    }, 
    tableHooks,
    useSortBy
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance

  return (
    <div className='container-fluid body-wrapper'>
      <Sidebar />
      <div className='main-panel'>
        <Container className='my-5'>
        <Row className='justify-content-center align-items-center'>
          <Col lg={10} md={12} sm={12}>
          <Card className='w-100 shadow-lg'>
            <Card.Body>
              <Card.Title>
                <h4 className='p-4 text-center'> Movie Table </h4>
                <div className='d-flex justify-content-evenly'>
                  <Button onClick={sortingName} style={{ backgroundColor : '#262b40', borderColor:'#262b40'}} >
                    SortBy Name
                  </Button>
                  <Button onClick={sortingLanguage}  style={{ backgroundColor : '#262b40', borderColor:'#262b40'}} >
                    SortBy Language
                  </Button>
                  <Button onClick={fetchData}  style={{ backgroundColor : '#262b40', borderColor:'#262b40'}} >
                    Reset
                  </Button>
                </div>
                
              </Card.Title>
              <Table {...getTableProps()} className="table-hover" responsive={true}>
                <thead> 
                    {headerGroups.map((headerGroup)=>(
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render("Header")}
                          {column.isSorted ? (column.isSortedDesc ? <ArrowBarUp /> : <ArrowBarDown />) : ''}
                          </th>
                        ))}
                      </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
            </Table>
            </Card.Body>
            
          </Card>
         
          </Col>
        </Row>
        </Container>
        <Container>
            <Row className='text-center'>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle style={{ backgroundColor : '#262b40', borderColor:'#262b40'}}  id="dropdown-basic">
                      Select From All Location
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                      { location.map((location)=>{
                        return <Dropdown.Item href={`/location/${location}`} key={location}>{location}</Dropdown.Item>
                      })}
                      
                    </Dropdown.Menu>
                  </Dropdown>                
                </Col>
            </Row>
        </Container>
      </div>
    </div>
  )
}

export default Movie