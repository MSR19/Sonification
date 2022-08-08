# Sonification

This is a simple JavaScript that uses CSV file containing a variable and transform it into sound. 
To do this the information is normalized and mapped to an instrument or the duration of the notes.

This uses the jsmidgen (https://www.npmjs.com/package/jsmidgen) to transform the normalized data into a midi file.

# Run

To run this project run the following commands:

### npm install

### npm start OUTFILENAME MINPERCENTAGE MAXPERCENTAGE VAR1FILENAME [VAR2FILENAME [VER3FILENAME]]

Minpercentage and Maxpercentage are the beginning and end of the used data. 
For example, if you only want to use the initial 25% of the data you can start the program with:

npm start OUTFILENAME 0 25 VAR1FILENAME [VAR2FILENAME [VER3FILENAME]]

Each file can contain only one variable and all the files must have the same number of data entries.

The VarFiles are mapped to specific sound characteristics. The Var1 and Var2 are mapped to instruments and Var3 is mapped to notes duration.

#Examples 

This repo also contains examples of sonified data.

These examples were used in another project (https://github.com/MSR19/Multisensory-Interface)
