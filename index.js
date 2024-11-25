import { existsSync } from 'fs';
import { resolve } from 'path';

const main = () => {
    const dayArg = process.argv[2];

    if (!dayArg) {
        console.error('Erreur : veuillez spécifier le numéro du jour (ex: node index.js 1).');
        process.exit(1);
    }

    const day = `day${dayArg}`;
    const dayPath = resolve(`./${day}/index.js`);

    if (!existsSync(dayPath)) {
        console.error(`Erreur : le fichier pour ${day} n'existe pas.`);
        process.exit(1);
    }

    import(dayPath)
        .then((module) => {
            if (module.default && typeof module.default === 'function') {
                module.default();
            } else {
                console.error(`Erreur : le module ${dayPath} doit exporter une fonction par défaut.`);
            }
        })
        .catch((error) => {
            console.error(`Erreur lors du chargement du fichier pour ${day} :`, error.message);
            process.exit(1);
        });
};

main();
