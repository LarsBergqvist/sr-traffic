import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslationService) {}

  transform(value: string, args?: string | string[]): string {
    if (!value) return;
    return this.translate.translateWithArgs(value, args);
  }
}
