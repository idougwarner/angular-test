import { Injectable } from '@angular/core';
import { IOption } from 'ng-select';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SelectOptionService {

    public static readonly PLAYER_ONE: Array<IOption> = [
        { value: '0', label: 'Admin' },
        { value: '1', label: 'Read  Only' },
        { value: '2', label: 'Read \ Write' },

    ];

    getCharacters(): Array<IOption> {
        return this.cloneOptions(SelectOptionService.PLAYER_ONE);
    }

    loadCharacters(): Observable<Array<IOption>> {
        return this.loadOptions(SelectOptionService.PLAYER_ONE);
    }

    getCharactersWithDisabled(): Array<IOption> {
        const characters: Array<IOption> = this.cloneOptions(SelectOptionService.PLAYER_ONE);
        characters[1].disabled = true;
        characters[4].disabled = true;
        return characters;
    }

    private loadOptions(options: Array<IOption>): Observable<Array<IOption>> {
        return new Observable((obs) => {
            setTimeout(() => {
                obs.next(this.cloneOptions(options));
                obs.complete();
            }, 5000);
        });
    }

    private cloneOptions(options: Array<IOption>): Array<IOption> {
        return options.map(option => ({ value: option.value, label: option.label }));
    }
}
