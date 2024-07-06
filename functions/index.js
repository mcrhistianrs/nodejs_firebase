const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

exports.addRecord = functions.https.onRequest(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw new Error('O campo "name" é obrigatório no corpo da requisição.');
        }

        const nextIncrementId = await getNextIncrementId();

        // Adiciona o registro ao Firestore com o increment_id definido
        await firestore.collection('records').add({
            name: name,
            increment_id: nextIncrementId
        });

        res.status(200).json({ message: 'Registro adicionado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.setIncrementIdOnCreate = functions.firestore
    .document('records/{recordId}')
    .onCreate(async (snapshot, context) => {
        const recordId = context.params.recordId;
        const incrementId = await getNextIncrementId();

        // Atualiza o documento recém-criado com o increment_id
        await snapshot.ref.update({ increment_id: incrementId });
    });

async function getNextIncrementId() {
    const snapshot = await firestore.collection('records').orderBy('increment_id', 'desc').limit(1).get();

    if (snapshot.empty) {
        return 1; // Se não houver registros, retorna 1 como próximo increment_id
    }

    const lastRecord = snapshot.docs[0].data();
    const currentIncrementId = lastRecord.increment_id;
    return currentIncrementId + 1;
}
