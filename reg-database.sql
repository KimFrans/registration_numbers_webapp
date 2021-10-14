CREATE TABLE regTown(
    id SERIAL PRIMARY KEY,
    townName text not null,
    townSymbol text not null
);

CREATE TABLE regPlates(
    id SERIAL PRIMARY KEY,
    reg text not null,
    regTown_id int,
	foreign key (regTown_id) references regTown(id)
);


INSERT INTO regTown (townName, townSymbol) VALUES ('Cape Town', 'CA');
INSERT INTO regTown (townName, townSymbol) VALUES ('Stellenbosch', 'CL');
INSERT INTO regTown (townName, townSymbol) VALUES ('Bellville', 'CF');
INSERT INTO regTown (townName, townSymbol) VALUES ('Paarl', 'CJ');