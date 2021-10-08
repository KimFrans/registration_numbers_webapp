CREATE TABLE regTown(
    id SERIAL PRIMARY KEY,
    townName VARCHAR(100) NOT NULL,
);

CREATE TABLE regPlates(
    id SERIAL PRIMARY KEY,
    reg VARCHAR(100) NOT NULL,
    regTown_id int,
	foreign key (regTown_id) references regTown(id)
);
