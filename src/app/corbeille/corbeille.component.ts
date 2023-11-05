import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corbeille',
  templateUrl: './corbeille.component.html',
  styleUrls: ['./corbeille.component.css']
})
export class CorbeilleComponent implements OnInit {
  titreTableau = 'Listes des contacts Supprimés';
  public contacts: any[] = [
    {
      id: '1',
      email: 'habib@gmail.com',
      password: 'habib',
      Date : 'new Date',
      donnee: [
        {
          id: '',
          nom: 'fatou',
          prenom: '',
          email: '',
          numero: '+221 77 100 00 00 ',
          photo: '',
          etat: '0'
        }
      ]
    }
  ];
  constructor(private router: Router) {
  }
  searchText = '';

  ngOnInit(): void {
    // Récupérer les données du localStorage
    const contactsStr = localStorage.getItem('contacts');

    if (contactsStr) {
      // Si des données sont présentes dans le local storage, désérialisez-les et mettez-les à jour dans votre tableau de contacts
      this.contacts = JSON.parse(contactsStr);
    } else {
      // Si aucune donnée n'est présente dans le local storage, initialisez-le avec vos données par défaut
      this.mettreAJourLocalStorage();
    }
}


  supprimerContact(id: string) {
    const userIndex = this.contacts.findIndex(user => user.id === id);

    if (userIndex !== -1) {
      this.contacts.splice(userIndex, 1);
      this.mettreAJourLocalStorage();
    }
  }

  addContact() {
    let nouvelUtilisateur = {
      id: (this.contacts.length + 1).toString(),
      email: 'nouvellemail@gmail.com',
      password: 'nouveauMotDePasse',
      contact: [
        {
          id: '',
          nom: 'Nouveau',
          prenom: 'Contact',
          email: 'nouveaucontact@gmail.com',
          numero: '',
          photo: '',
          etat: '0'
        }
      ]
    };

    this.contacts.push(nouvelUtilisateur);
    this.mettreAJourLocalStorage();
  }

  mettreAJourLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
}
