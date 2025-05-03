export interface Reservation {
    id: number;
    checkin: string;
    checkout: string;
    PrixTotal: number;
    nbPerson: number;
    client_email: string | null;
    Maisondhote_id: number | null;
    etat: string;
  }
  