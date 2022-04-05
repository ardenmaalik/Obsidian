import {
	collection,
	query,
	where,
	doc,
	getDocs,
	addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import { db } from "../../firebase";

// export const getColumns = async (id) => {
//     const q = query(collection(db, "projects", id, "columns"));
//     const queryProjects = await getDocs(q)
//     return queryProjects
// };

export const getData = async (id) => {
	//if order is number, query docs where order is greater than number
	const q = query(collection(db, "projects", id, "data"));
	const queryProjects = await getDocs(q);
	return queryProjects;
};

export const createNewDoc = async (id, data) => {
	let q;
	if (data.order === 0) {
		q = query(collection(db, "projects", id, "data"));
		const queryProjects = await getDocs(q);
		queryProjects.forEach((item) => {
			updateDoc(doc(db, "projects", id, "data", item.id), {
				order: item.data().order + 1,
			});
		});
	} else {
		q = query(
			collection(db, "projects", id, "data"),
			where("order", "=>", data.order)
		);
		const queryProjects = await getDocs(q);
		queryProjects.forEach((item) => {
			updateDoc(doc(db, "projects", id, "data", item.id), {
				order: item.data().order + 1,
			});
		});
	}
	addDoc(collection(db, "projects", id, "data"), data);
};


export const deleteRow = async (id, data) => {
    console.log('DELETE ROW: ', id, data)
    deleteDoc(doc(db, "projects", id, "data", data.id));

    let q;
    q = query(collection(db, "projects", id, "data"));
    const queryProjects = await getDocs(q)
    console.log(queryProjects)
    queryProjects.forEach((item) => {
        if (item.data().order > data.order) {
            console.log(true)
            updateDoc(doc(db, "projects", id, "data", item.id), {
                order: item.data().order - 1
            })
        }
    })
}