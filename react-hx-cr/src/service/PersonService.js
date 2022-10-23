import axios from 'axios';
import swal from 'sweetalert';

export class PersonService{
    url = "http://localhost:8080/api/"
    getAll(){
        return axios.get(this.url + "all").then(res => res.data);
    }

    save(person){
        try {
            return axios.post(this.url + "save", person).then(res => res.data);        
        } catch (error) {
            return swal("No");
        }
        
    }

    leap(birth){
        return axios.get(this.url+"leap/"+birth).then(res => res.data);
    }
}
