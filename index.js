import { resolve } from 'path';

const main = () => {
    const dayArg = process.argv[2];

    const day = `day${dayArg}`;
    const dayPath = resolve(`./${day}/index.js`);

    import(dayPath)
        .then((module) => {
            module.default();
        })
        .catch((error) => {
            console.error(`Erreur lors du chargement du fichier pour ${day} :`, error.message);
            process.exit(1);
        });
};

main();
