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
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarMapel() {
  const refDokumen = collection(db, "jadwal");
  const kueri = query(refDokumen, orderBy("hari"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().hari,
      jamke: dok.data().jamke,
      waktu: dok.data().waktu,
      mapel: dok.data().mapel,
      namaguru:dok.data().namaguru,
      kelas: dok.data().kelas,
      mp: dok.data().mp,

    });
  });



  return hasil;
}

export async function tambahAbsensi(hari, jamke, waktu, mapel, namaguru, kelas) {
  try {
    const dokRef = await addDoc(collection(db, 'absensi'), {
      hari: hari,
      jamke: jamke,
      waktu: waktu,
      mapel: mapel,
      namaguru: namaguru,
      kelas: kelas
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusAbsensi(docId) {
  await deleteDoc(doc(db, "absensi", docId));
}

export async function ubahAbsensi(hari, jamke, waktu, mapel, namaguru, kelas) {
  await updateDoc(doc(db, "absensi", docId), {
    hari: hari,
    jamke: jamke,
    waktu: waktu,
    mapel: mapel,
    namaguru: namaguru,
    kelas: kelas
  });
}

export async function ambilAbsensi(docId) {
  const docRef = await doc(db, "absensi", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}