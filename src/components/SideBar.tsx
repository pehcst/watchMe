import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface sidebarProps {
  handleClick: (id: any) => void;
  genderId: number;
}

export function SideBar({handleClick, genderId}: sidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  // Complete aqui
  return(
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
      {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClick(genre.id)}
            selected={genderId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}