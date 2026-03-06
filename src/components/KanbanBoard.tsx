import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Application = {
  id: string;
  poste: string;
  entreprise: string;
  date: string;
  statut: string;
};

interface KanbanBoardProps {
  applications: Application[];
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}

const columns = [
  { key: 'en_attente', label: 'En attente', emoji: '⏳', bg: 'bg-muted/30', accent: 'border-muted-foreground/20', badge: 'bg-muted text-muted-foreground' },
  { key: 'envoyee', label: 'Envoyée', emoji: '📨', bg: 'bg-blue-50', accent: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
  { key: 'relance', label: 'Relancé', emoji: '🔄', bg: 'bg-amber-50', accent: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  { key: 'entretien', label: 'Entretien ✓', emoji: '🎯', bg: 'bg-green-50', accent: 'border-green-200', badge: 'bg-green-100 text-green-700' },
  { key: 'refus', label: 'Refus', emoji: '❌', bg: 'bg-red-50', accent: 'border-red-200', badge: 'bg-red-100 text-red-700' },
];

const getInitialColor = (name: string) => {
  const colors = ['bg-primary/15 text-primary', 'bg-accent/15 text-accent', 'bg-success/15 text-success', 'bg-warning/15 text-warning', 'bg-destructive/15 text-destructive'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const KanbanBoard = ({ applications, onStatusChange, onDelete }: KanbanBoardProps) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newStatus = result.destination.droppableId;
    const appId = result.draggableId;
    if (newStatus !== result.source.droppableId) {
      onStatusChange(appId, newStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 min-h-[400px]">
        {columns.map((col) => {
          const colApps = applications.filter(a => a.statut === col.key);
          return (
            <div key={col.key} className={`rounded-2xl p-3 ${col.bg} border ${col.accent}`}>
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="text-lg">{col.emoji}</span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/70">{col.label}</h3>
                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${col.badge}`}>{colApps.length}</span>
              </div>
              <Droppable droppableId={col.key}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-2 min-h-[100px] rounded-xl p-1 transition-colors ${snapshot.isDraggingOver ? 'bg-primary/5' : ''}`}
                  >
                    {colApps.map((app, index) => (
                      <Draggable key={app.id} draggableId={app.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-card rounded-xl p-3 border border-border/30 shadow-sm transition-shadow group ${
                              snapshot.isDragging ? 'shadow-wow-sm rotate-2' : 'hover:shadow-wow-sm'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${getInitialColor(app.entreprise)}`}>
                                {app.entreprise.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{app.poste}</p>
                                <p className="text-xs text-muted-foreground truncate">{app.entreprise}</p>
                                <p className="text-xs text-muted-foreground/60 mt-1">{app.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link
                                to={`/candidature/${app.id}`}
                                className="text-xs font-semibold text-primary hover:underline"
                              >
                                Voir
                              </Link>
                              {col.key === 'entretien' && (
                                <Link
                                  to={`/preparation-entretien/${app.id}`}
                                  className="text-xs font-semibold text-success hover:underline ml-auto"
                                >
                                  🎯 Préparer
                                </Link>
                              )}
                              <button
                                onClick={() => onDelete(app.id)}
                                className="text-xs text-destructive/60 hover:text-destructive ml-auto"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
