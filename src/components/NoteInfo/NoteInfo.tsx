import * as React from 'react';
import './NoteInfo.scss';
import { ListItem } from '../../data/ListService';
import { Link } from 'react-router-dom';

interface Props {
	note: ListItem;
}

export const NoteInfo: React.FC<Props> = ({ note }) => {
	const { id, title, description } = note
	
	return (
  	<div className="NoteInfo">
			<Link to={`/note/${ id }`}><b>{title}</b></Link>
			<p className="bottom-note">{description}</p>
		</div>
	)
};

NoteInfo.displayName = 'NoteInfo';
