import React, { Component } from 'react';
import './App.css';
import { PersonService } from './service/PersonService';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import swal from 'sweetalert';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      person: {
        id: null,
        name: null,
        lastname: null,
        email: null,
        birth: null
      },
      selectedPerson : {

      }
    };

    this.items = [
      {
        label : 'New',
        icon : 'pi pi-fw pi-plus',
        command : () => {this.showDialog()}
      },
      {
        label : 'Leap?',
        icon : 'pi pi-calendar',
        command : () => {this.leap()}
      }
    ];
    this.personService = new PersonService();
    this.save = this.save.bind(this);
    this.leap = this.leap.bind(this);
    this.footer = (
      <div>
        <Button label="Save" icon="pi pi-check" onClick={this.save}/>
      </div>

    );
    this.Toast = React.createRef();
    
  }

  componentDidMount(){
    this.personService.getAll().then(data => this.setState({persons: data}))
  }

  save(){
    if (this.state.person.name!=null && this.state.person.lastname!=null && this.state.person.email!=null && this.state.person.birth!=null){
      this.personService.save(this.state.person).then(data => {
        this.setState({
          visible : false,
          person: {
            id: null,
            name: null,
            lastname: null,
            email: null,
            birth: null
          }
        });
        swal("Person registered succesfully");
        this.personService.getAll().then(data => this.setState({persons: data}))
      })

    } else {
      swal("All the fields are required");
    }
  }

  leap(){
    this.personService.leap(this.state.selectedPerson.birth).then(data => {
      console.log(data);
      if (data === true){
        swal ("The year of birth of " + this.state.selectedPerson.name  + "("+this.state.selectedPerson.birth+")" + " is leap");
      } else {
        swal ("The year of birth of " + this.state.selectedPerson.name  + "("+this.state.selectedPerson.birth+")" + " is NOT leap");
      }
    })
  }


  render(){
    return (
      <div>
        <Menubar model={this.items}/>
        <DataTable value={this.state.persons} paginator={true} rows="8" selectionMode="single" selection={this.state.selectedPerson} onSelectionChange={e => this.setState({selectedPerson: e.value})}>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="lastname" header="Last Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="birth" header="Year of Birth"></Column>
        </DataTable>
        <Dialog header="New Person" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible : false})} >
          <form id='create-form'>
            <span className='p-float-label'>
              <InputText value={this.state.person.name} style={{width : '100%'}}  id="name" onChange={(e) => {
                  let val = e.target.value;
                  this.setState(prevState => {
                  let person = Object.assign({}, prevState.person)
                  person.name = val;

                  return { person };
                  })}
                }/>
                <label htmlFor='name'>Name</label>

            </span>
            <br></br>
            <span className='p-float-label'>
              <InputText value={this.state.person.lastname} style={{width : '100%'}} id="lastname" onChange={(e) => {
                  let val = e.target.value;
                  this.setState(prevState => {
                  let person = Object.assign({}, prevState.person)
                  person.lastname = val;

                  return { person };
                  })}
                }/>
                <label htmlFor='lasname'>LastName</label>

            </span>
            <br></br>
            <span className='p-float-label'>
              <InputText value={this.state.person.email} style={{width : '100%'}} id="email" onChange={(e) => {
                  let val = e.target.value;
                  this.setState(prevState => {
                  let person = Object.assign({}, prevState.person)
                  person.email = val;

                  return { person };
                  })}
                }/>
                <label htmlFor='email'>Email</label>

            </span>
            <br></br>
            <span className='p-float-label'>
              <InputText value={this.state.person.birth} style={{width : '100%'}} id="birth" onChange={(e) => {
                  let val = e.target.value;
                  this.setState(prevState => {
                  let person = Object.assign({}, prevState.person)
                  person.birth = val;

                  return { person };
                  })}
                }/>
                <label htmlFor='birth'>Birth</label>

            </span>
          </form>
        </Dialog>
        <Toast ref={this.Toast}/>
      </div>
    );
  }

  showDialog(){
    this.setState({
      visible : true,
      person: {
        id: null,
        name: null,
        lastname: null,
        email: null,
        birth: null
      }
    });
    document.getElementById('create-form').reset();
  }

}


