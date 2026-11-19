// Cria as collections exigidas. A operacao e segura se ja existirem.
const dbName = "citizentech_enchentes";
const citizenDb = db.getSiblingDB(dbName);

const existentes = citizenDb.getCollectionNames();

if (!existentes.includes("monitoramentos")) {
    citizenDb.createCollection("monitoramentos");
    print("Collection monitoramentos criada.");
} else {
    print("Collection monitoramentos ja existe.");
}

if (!existentes.includes("alertas")) {
    citizenDb.createCollection("alertas");
    print("Collection alertas criada.");
} else {
    print("Collection alertas ja existe.");
}
