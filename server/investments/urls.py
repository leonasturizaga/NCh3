from django.urls import path
from .views import InvestmentDetailView, InvestmentListCreateView, ResultDetailView, ResultListCreateView

urlpatterns = [
    path('investment-detail/', InvestmentDetailView.as_view(), name='investment-datail'),
    path('investment-list-create/', InvestmentListCreateView.as_view(), name='investment-datail'),
    

    path('result-detail/', ResultDetailView.as_view(), name='result-datail'),
    path('result-list-create/', ResultListCreateView.as_view(), name='result-datail'),
]
