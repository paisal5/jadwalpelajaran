import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwZk_BSxdm6_VJsVPI2Ne8S3RO5pi0-lg",
  authDomain: "paisal-abret.firebaseapp.com",
  projectId: "paisal-abret",
  storageBucket: "paisal-abret.appspot.com",
  messagingSenderId: "368318578592",
  appId: "1:368318578592:web:491e88e8b6eee503d72ec5",
  measurementId: "G-7Q534CCZNV"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarjadwal() {
  const refDokumen = collection(db, "jadwal");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().hari,
      jamke: dok.data().jamke,
      kelas: dok.data().kelas,
      mapel: dok.data().mapel,
      namaguru: dok.data().namaguru,
      waktu: dok.data().waktu
     

    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahjadwal(hari, jamke, kelas, mapel, namaguru, waktu) {
  try {
    const dokRef = await addDoc(collection(db, 'jadwal'), {
      hari: hari,
      jamke: jamke,
      kelas: kelas,
      mapel: mapel,
      namaguru: namaguru,
      guru: waktu
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusjadwal(docId) {
  await deleteDoc(doc(db, "jadwal", docId));
}

export async function ubahjadwal(docId, hari, jamke, kelas, mapel, namaguru, waktu) {
  await updateDoc(doc(db, "jadwal", docId), {
    hari: hari,
    jamke: jamke,
    kelas: kelas,
    mapel: mapel,
    namaguru: namaguru,
    waktu: waktu
  });
}

export async function ambiljadwal(docId) {
  const docRef = await doc(db, "jadwal", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}