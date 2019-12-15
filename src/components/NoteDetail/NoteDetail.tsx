import * as React from 'react';
import './NoteDetail.scss';
import { ListService, ListItem } from '../../data/ListService'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
	noteId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export const NoteDetail: React.FC<Props> = ( { match } ) => {
	
	const [note, setNote] = React.useState<ListItem>();
	const [title, setTitle] = React.useState<string>();
	const [items, setItems] = React.useState<string[]>();

	React.useEffect(() => {
		note !== undefined && setItems(note.items);
		note !== undefined && setTitle(note.title);
	}, [note])

	React.useEffect(() => {
		ListService.getItem(+match.params.noteId).then(setNote);
	}, [match.params.noteId])
	
	React.useEffect(() => {
		items !== undefined && ListService.updateNoteItems(+match.params.noteId, items);
	}, [items])

	const toggleNewElement = () => {
		document.getElementById('new-button')?.classList.toggle('hidden')	
		document.getElementById('new-input-text')?.classList.toggle('hidden')	
	}

	const onInputTextEnter = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			const item = document.querySelector('#new-input-text > input[type=text]')
			if (item instanceof HTMLInputElement){
				items !== undefined && setItems([...items, item.value])
				toggleNewElement()
			}
		}
	}
	
	const deleteItem = (event: React.MouseEvent) => {
		const button = event.target;
		if (button instanceof HTMLButtonElement){	
			const deleteIndex = button.dataset.itemIndex === undefined ? -1 : +button.dataset.itemIndex;
			if (items !== undefined && items.length > deleteIndex && deleteIndex != -1){
				items.splice(deleteIndex, 1);	
				setItems([...items]);
			}
		}
	}


	return (
		<div className="NoteDetail">
			<h3>{ title }</h3>
			<ul>
				{items?.map((item, index) => {
				return (<div key={ index } className='note-item-list'>
									<li>
							 	 		{item}
									</li>
									<button id="delete-button" onClick={ deleteItem } data-item-index={ index }>x</button>
					 		 </div>)
				})}
				<button id='new-button' onClick={ toggleNewElement }>New</button>
				<li id='new-input-text' className='hidden'><input type='text' onKeyDown={ onInputTextEnter } ></input></li>
			</ul>
	</div>
	)
};

NoteDetail.displayName = 'NoteDetail';
