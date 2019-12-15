import * as React from 'react';
import './NotesInfo.scss';
import { ListService, ListItem } from '../../data/ListService';
import { NoteInfo } from '../NoteInfo';

export const NotesInfo: React.FC<{}> = () => {

	const [notes, setNotes] = React.useState<ListItem[]>();
	
	React.useEffect(() => {
		ListService.getItems().then(setNotes);			
	}, [])

	return (
		<div className="NotesInfo">
			{notes?.map((note) => (
					<NoteInfo key={ note.id } note={ note }/>
			))}	
		</div>
	);
};

NotesInfo.displayName = 'NotesInfo';
