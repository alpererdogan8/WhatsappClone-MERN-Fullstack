import React from 'react';
import { Search, UnreadButton } from '../../icons';

const SearchBar = () => {
	return (
		<div className="sidebar-search">
			<div className="search-input">
				<button>
					<Search />
				</button>
				<input type="text" placeholder="Aratın veya yeni sohbet başlatın" />
			</div>

			<button type="submit">
				<UnreadButton />
			</button>
		</div>
	);
};

export default SearchBar;
