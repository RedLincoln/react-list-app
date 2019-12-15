import * as React from 'react';
import './NotesWrapper.scss';
import { ListService, ListItem } from '../../data/ListService';
import { NotesInfo } from '../NotesInfo';
import { BrowserRouter as Router, Route }  from 'react-router-dom'
import { NoteDetail } from '../NoteDetail';

export const NotesWrapper: React.FC<{}> = () => {
	
	return (
		<Router>
			<div className="NotesWrapper">
				<NotesInfo />
				<Route path='/note/:noteId' component={ NoteDetail }/>
			</div>
		</Router>
	);
};

NotesWrapper.displayName = 'NotesWrapper';
