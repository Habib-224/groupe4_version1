import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  iduser: any;
  userid: any;
  contactlength: any;
  userName:any

  usernumero: any;

   constructor(private route: ActivatedRoute) {
    this.iduser = 0;
  }

   formDatacontact = {
    nom: '',
    prenom: '',
    email: '',
    numero: '',
    file:''
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let userid = this.iduser = +params['id'];
    });

      this.datastring = localStorage.getItem('user');
      let existingData = this.datastring ? JSON.parse(this.datastring) : [];

      let user: any[] = existingData;

      //@ts-ignore
      // let userFound = user.find(existingData => existingData.id === this.userid);
      let urlUserId = parseInt(this.route.snapshot.paramMap.get('id') || '');

      let userFound = user.find(existingData => existingData.id === urlUserId);
      if (userFound) {
        this.usernumero = userFound.contact;
        this.contactlength = this.usernumero.length - 1
        this.userName = userFound.email;
        console.log(userFound)
        // console.log(this.usernumero); // Vérifiez la console pour voir si les contacts sont correctement récupérés
      }else {
        console.log('Utilisateur non trouvé'); // Affichez un message d'erreur si l'utilisateur n'est pas trouvé
      }



  }

  userfoundid: any;
  datastring: any;



  Contactfunction(event: Event) {
    event.preventDefault();
    if (this.formDatacontact.nom != "" && this.formDatacontact.prenom != "" && this.formDatacontact.email != "" && this.formDatacontact.numero != "" && this.formDatacontact.file != "") {
      let nom = this.formDatacontact.nom;
      let prenom = this.formDatacontact.prenom;
      let email = this.formDatacontact.email;
      let numero = this.formDatacontact.numero;
      let file = this.formDatacontact.file;


      this.datastring = localStorage.getItem('user');
      let existingData = this.datastring ? JSON.parse(this.datastring) : [];

      let user: any[] = existingData;


      //@ts-ignore
      // let userFound = user.find(existingData => existingData.id === this.userid);
       let urlUserId = parseInt(this.route.snapshot.paramMap.get('id') || '');

     //@ts-ignore
      let userFound = user.find(existingData => existingData.id === urlUserId);



      // console.log(userFound.contact[0].nom);
      // this.usernumero = userFound.contact[0].nom;


      if (userFound) {
          userFound.contact.push({
            id: userFound.contact.length + 1, nom: nom, prenom: prenom, email: email, numero: numero, photo: file, etat: '1' ,
          });
        localStorage.setItem('user', JSON.stringify(existingData));
      } else {
        console.log("user not found")
      }

    }
  }

  Archiverfunction(id: number) {
    alert(id);
  }

}
