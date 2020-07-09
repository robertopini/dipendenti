annotate DipService.Dipendenti with @(

	UI: {
		SelectionFields: [ ID ],
		LineItem: [
			{ Value: ID, Label: 'ID' },
			{ Value: nome, Label: 'Nome' },
			{ Value: cognome, Label: 'Cognome' },
			{ Value: salario, Label: 'Salario' },
            { Value: ruolo, Label: 'Ruolo'},
            {Value: dipartimento.nome, Label: 'Dipartimento'}        
		]
	}

);