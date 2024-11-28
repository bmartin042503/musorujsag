CREATE TABLE Csatorna (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    leiras TEXT,
    kategoria VARCHAR(50)
);

CREATE TABLE Musor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cim VARCHAR(100) NOT NULL,
    epizod VARCHAR(150),
    ismerteto TEXT
);

CREATE TABLE Szereplo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    foglalkozas VARCHAR(50),
    nemzetiseg VARCHAR(50),
    szuletesi_datum DATE
);

CREATE TABLE Kozvetit (
    csatorna_id INT,
    musor_id INT,
    mikor DATETIME,
    PRIMARY KEY (csatorna_id, musor_id, mikor),
    FOREIGN KEY (csatorna_id) REFERENCES Csatorna(id) ON DELETE CASCADE,
    FOREIGN KEY (musor_id) REFERENCES Musor(id) ON DELETE CASCADE
);

CREATE TABLE Szerepel (
    musor_id INT,
    szereplo_id INT,
    PRIMARY KEY (musor_id, szereplo_id),
    FOREIGN KEY (musor_id) REFERENCES Musor(id) ON DELETE CASCADE,
    FOREIGN KEY (szereplo_id) REFERENCES Szereplo(id) ON DELETE CASCADE
);

CREATE TABLE Admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    jelszo VARCHAR(255) NOT NULL,
    utolso_belepes DATETIME
);